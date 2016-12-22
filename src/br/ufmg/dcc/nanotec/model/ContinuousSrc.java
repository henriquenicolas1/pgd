package br.ufmg.dcc.nanotec.model;

import br.ufmg.dcc.nanotec.annotations.CtlProperty;

public class ContinuousSrc extends CtlObject {
	
	public static final String CTL_CLASS_NAME = "continuous-src";
	
	@CtlProperty("frequency")
	private Number frequency;
	
	@CtlProperty("start-time")
	private Number startTime;
	
	@CtlProperty("end-time")
	private Number endTime;
	
	@CtlProperty("width")
	private Number width;
	
	@CtlProperty("cutoff")
	private Number cutoff;
	
	@Override
	public String getCtlClassName() {
		return CTL_CLASS_NAME;
	}

	public Number getFrequency() {
		return frequency;
	}

	public void setFrequency(Number frequency) {
		this.frequency = frequency;
	}

	public Number getStartTime() {
		return startTime;
	}

	public void setStartTime(Number startTime) {
		this.startTime = startTime;
	}

	public Number getEndTime() {
		return endTime;
	}

	public void setEndTime(Number endTime) {
		this.endTime = endTime;
	}

	public Number getWidth() {
		return width;
	}

	public void setWidth(Number width) {
		this.width = width;
	}

	public Number getCutoff() {
		return cutoff;
	}

	public void setCutoff(Number cutoff) {
		this.cutoff = cutoff;
	}

}