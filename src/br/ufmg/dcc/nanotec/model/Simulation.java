package br.ufmg.dcc.nanotec.model;

import java.io.IOException;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

public class Simulation {
	
	private boolean reset;

	private Map<String, Object> params = new HashMap<>();
	
	private RunUntil runUntil;
	
	public CtlList getGeometry() {
		return (CtlList) params.get("geometry");
	}
	
	/**
	 * Writes this object to CTL format
	 * @param writer The Object to be written
	 */
	public void write(Writer writer) throws IOException {
		if(isReset()) writer.write("(reset-meep)");
		for(String param : this.params.keySet()){
			try {
				Object object = this.params.get(param);
				if(object!=null){
					writer.write("(set! ");
					writer.write(param);
					writer.write(" ");
					CtlObject.writeProperty(object, writer);
					writer.write(")");
				}
			} catch (IllegalArgumentException e) {
				throw new IOException(e);
			}
		}
		if(runUntil!=null) runUntil.write(writer);
	}
	
	public void reset() {
		this.params.clear();
		this.setReset(true);
	}

	public boolean isReset() {
		return reset;
	}

	public void setReset(boolean reset) {
		this.reset = reset;
	}

	public RunUntil getRunUntil() {
		return runUntil;
	}

	public void setRunUntil(RunUntil runUntil) {
		this.runUntil = runUntil;
	}

	public Map<String, Object> getParams() {
		return params;
	}

	public void setParams(Map<String, Object> params) {
		this.params = params;
	}

}
