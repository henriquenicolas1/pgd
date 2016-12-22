package br.ufmg.dcc.nanotec.model;

import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

public class RunUntil {
	
	public static final String CTL_CLASS_NAME = "run-until";
	
	private Number time;
	
	private List<String> stepFunctions = new ArrayList<>();
	
	public void addStepFunction(String function){
		this.stepFunctions.add(function);
	}

	public void write(Writer writer) throws IOException {
		writer.write("(run-until ");
		writer.write(time.toString());
		writer.write(" ");
		for(String function : stepFunctions){
			writer.write("(");
			writer.write(function);
			writer.write(")");
		}
		writer.write(")");
	}

	public Number getTime() {
		return time;
	}

	public void setTime(Number time) {
		this.time = time;
	}

}
