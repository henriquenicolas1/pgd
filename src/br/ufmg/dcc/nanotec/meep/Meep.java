package br.ufmg.dcc.nanotec.meep;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import br.ufmg.dcc.nanotec.model.Simulation;

public class Meep implements Runnable,AutoCloseable {

	private static final Pattern LIGHT_FILE_PATTERN = Pattern.compile("creating output file \"(?<filename>.*ez-.*)\"");
	private static final Pattern MEEP_PROGRESS_PATTERN = Pattern.compile("Meep progress: .* = (?<progress>.*)% done in .*s, .*s to go");
	
	private Runtime runtime;
	private Process process;
	private Path workingDirectory;
	private OutputStream outputStream;
	private InputStream errorStream;
	private InputStream inputStream;
	private Simulation simulation;
	private Queue<File> lightFiles;
	private boolean closed;

	private class MeepOutputWatcher extends Thread {

		@Override
		public void run() {
			try (InputStreamReader reader = new InputStreamReader(inputStream);
					BufferedReader bufferedReader = new BufferedReader(reader)){
				String line;
				File f = null;
				while ((line=bufferedReader.readLine())!=null) {
					Matcher outputFileMatcher = LIGHT_FILE_PATTERN.matcher(line);
					Matcher progressMatcher = MEEP_PROGRESS_PATTERN.matcher(line);
					if(outputFileMatcher.find()){
						// By adding the previous file we avoid concurrent access to the same
						if(f!=null) lightFiles.add(f);
						f = new File(outputFileMatcher.group("filename"));
						synchronized (lightFiles) {
							lightFiles.notify();
						}
					} else if(progressMatcher.find()){
						System.out.println(progressMatcher.group("progress"));
					}
				}
				if(f!=null) lightFiles.add(f);
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
	}

	private class MeepErrorWatcher extends Thread {

		@Override
		public void run() {
			try (InputStreamReader reader = new InputStreamReader(errorStream);
					BufferedReader bufferedReader = new BufferedReader(reader)){
				String line;
				while ((line=bufferedReader.readLine())!=null) {
					System.err.println(line);
				}
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
	}

	public Meep() throws IOException {
		runtime = Runtime.getRuntime();
		process = runtime.exec("meep");
		workingDirectory = Files.createTempDirectory("meep");
		outputStream = process.getOutputStream();
		errorStream = process.getErrorStream();
		inputStream = process.getInputStream();
		lightFiles = new ConcurrentLinkedQueue<File>();
		closed = false;
	}

	@Override
	public void run() {
		try {
			Thread errorWatcher = new MeepErrorWatcher();
			Thread outputWatcher = new MeepOutputWatcher();
			outputWatcher.start();
			errorWatcher.start();
			OutputStreamWriter writer = new OutputStreamWriter(outputStream, Charset.defaultCharset());
			writer.write("(use-output-directory \""+workingDirectory.toString()+"\")");
			simulation.write(writer);
			writer.close();
			outputWatcher.join();
			errorWatcher.join();
			closed = true;
			synchronized (lightFiles) {
				lightFiles.notify();
			}
		} catch (InterruptedException | IOException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	public void close() throws Exception {
		closed = true;
		outputStream.close();
		inputStream.close();
		errorStream.close();
		process.destroy();
	}

	public File getNextFile() throws InterruptedException {
		File file = null;
		synchronized (lightFiles) {
			while(((file=lightFiles.poll())==null) && !closed){
				lightFiles.wait();
			}			
		}
		return file;
	}

	public Simulation getSimulation() {
		return simulation;
	}

	public void setSimulation(Simulation simulation) {
		this.simulation = simulation;
	}

}
