package br.ufmg.dcc.nanotec.test;

import java.awt.image.BufferedImage;
import java.io.File;
import java.util.LinkedList;

import javax.imageio.stream.FileImageOutputStream;

import org.apache.commons.io.FileUtils;

import br.ufmg.dcc.nanotec.ctl.parser.Parser;
import br.ufmg.dcc.nanotec.ctl.parser.ParserFactory;
import br.ufmg.dcc.nanotec.hdf.HDFLoader;
import br.ufmg.dcc.nanotec.io.GifSequenceWriter;
import br.ufmg.dcc.nanotec.meep.Meep;
import br.ufmg.dcc.nanotec.model.Simulation;

public class Main {

	public static void main(String[] args) throws Exception {
		String ctl = FileUtils.readFileToString(new File("/home/jeronimo/Downloads/xor_gate_si.ctl")).replaceAll(";.*", "");
		Parser parser = ParserFactory.getInstance().buildParser();
		Simulation simulation = parser.parse(ctl);
		//		Helps Garbage Collector
		parser = null;
		ctl = null;
		//		Write CTL File
		//		PrintWriter writer = new PrintWriter(System.out);
		//		simulation.write(writer);
		//		writer.close();
		Meep meep = new Meep();
		meep.setSimulation(simulation);
		Thread thread = new Thread(meep);
		thread.start();

		double range = Double.MIN_VALUE;

		LinkedList<File> files = new LinkedList<>();
		File file = null;
		while((file=meep.getNextFile())!=null){
			double[] data = (double[]) HDFLoader.getDataset(file).getData();
			for(int i = 0;i<data.length;i++){
				double v = Math.abs(data[i]);
				if(v>range) range = data[i];
			}
			files.add(file);
		}

		File gif = new File("foto.gif");
		try(FileImageOutputStream fos = new FileImageOutputStream(gif);
				GifSequenceWriter writer = new GifSequenceWriter(fos, BufferedImage.TYPE_INT_BGR, 1, true)){
			while((file=files.poll())!=null){
				BufferedImage image = HDFLoader.getPicture(HDFLoader.getDataset(file),range);
				writer.writeToSequence(image);
			}
		}
		System.out.println("END");
		meep.close();
		thread.join();
	}

}
