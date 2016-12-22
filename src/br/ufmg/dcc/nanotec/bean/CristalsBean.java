package br.ufmg.dcc.nanotec.bean;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.imageio.ImageIO;

import br.ufmg.dcc.nanotec.ctl.parser.Parser;
import br.ufmg.dcc.nanotec.ctl.parser.ParserFactory;
import br.ufmg.dcc.nanotec.hdf.HDFLoader;
import br.ufmg.dcc.nanotec.meep.Meep;
import br.ufmg.dcc.nanotec.model.Simulation;

@ManagedBean(name="cristalsBean")
@SessionScoped
public class CristalsBean extends AbstractBean {

	private static final long serialVersionUID = 1L;

	private Parser parser = ParserFactory.getInstance().buildParser();
	private List<File> availableFiles;
	private double range;

	@PostConstruct
	public void init(){
		availableFiles = new ArrayList<>();
	}

	@PreDestroy
	public void destroy(){
		clear();
	}

	public void clear() {
		for(File f : availableFiles){
			f.delete();
		}
		availableFiles.clear();
		range = 0;
	}
	
	public static void main(String[] args) throws OutOfMemoryError, Exception {
		double range = 0;
		for(File file : new File("/home/henriquenicolas/Downloads/h5").listFiles()){
			double[] data = (double[]) HDFLoader.getDataset(file).getData();
			for(int i = 0;i<data.length;i++){
				double v = Math.abs(data[i]);
				if(v>range) range = data[i];
			}
		}
		for(File file : new File("/home/henriquenicolas/Downloads/h5").listFiles()){
			BufferedImage image = HDFLoader.getPicture(HDFLoader.getDataset(file),range);
			ImageIO.write(image, "png", new File(file.getParent(),file.getName().split("\\.")[0]+".png"));
		}
		
	}

	public void simulate(){
		try {
			Simulation simulation = parser.parse(getRequestParameterMap().get("ctl"));
			try {
				Meep meep = new Meep();
				meep.setSimulation(simulation);
				Thread t = new Thread(meep);
				t.start();
				range = Double.MIN_VALUE;
				clear();
				File file = null;
				while((file=meep.getNextFile())!=null){
					double[] data = (double[]) HDFLoader.getDataset(file).getData();
					for(int i = 0;i<data.length;i++){
						double v = Math.abs(data[i]);
						if(v>range) range = data[i];
					}
					availableFiles.add(file);
				}
				t.join();
				meep.close();
			} catch (IOException e){
				e.printStackTrace();
			}
		} catch (Exception e){
			e.printStackTrace();
		}
	}

	public double getRange() {
		return range;
	}

	public void setRange(double range) {
		this.range = range;
	}

	public List<File> getAvailableFiles() {
		return availableFiles;
	}

	public void setAvailableFiles(List<File> availableFiles) {
		this.availableFiles = availableFiles;
	}

}
