package br.ufmg.dcc.nanotec.model;

import br.ufmg.dcc.nanotec.annotations.CtlProperty;

public class Source extends CtlObject {
	
	public static final String CTL_CLASS_NAME = "source";
	
	@CtlProperty("src")
	private ContinuousSrc src;

	@CtlProperty("src-time")
	private SrcTime srcTime;
	
	@CtlProperty("center")
	private Vector3 center;
	
	@CtlProperty("size")
	private Vector3 size;
	
	@CtlProperty("amplitude")
	private Number amplitude;
	
	@CtlProperty("component")
	private String component;
	
//  TODO
//	@CtlProperty("amp-func")
//	private Function ampFunc;
	
	@Override
	public String getCtlClassName() {
		return CTL_CLASS_NAME;
	}

	public SrcTime getSrcTime() {
		return srcTime;
	}

	public void setSrcTime(SrcTime srcTime) {
		this.srcTime = srcTime;
	}

	public Vector3 getCenter() {
		return center;
	}

	public void setCenter(Vector3 center) {
		this.center = center;
	}

	public Vector3 getSize() {
		return size;
	}

	public void setSize(Vector3 size) {
		this.size = size;
	}

	public Number getAmplitude() {
		return amplitude;
	}

	public void setAmplitude(Number amplitude) {
		this.amplitude = amplitude;
	}

	public ContinuousSrc getSrc() {
		return src;
	}

	public void setSrc(ContinuousSrc src) {
		this.src = src;
	}

	public String getComponent() {
		return component;
	}

	public void setComponent(String component) {
		this.component = component;
	}

}
