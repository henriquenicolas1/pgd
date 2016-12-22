package br.ufmg.dcc.nanotec.model;

import br.ufmg.dcc.nanotec.annotations.CtlProperty;

public class Sphere extends GeometricObject {

	private static final String CTL_CLASS_NAME = "sphere";
	
	@Override
	public String getCtlClassName() {
		return CTL_CLASS_NAME;
	}
	
	@CtlProperty("radius")
	private Number radius;

	public Number getRadius() {
		return radius;
	}

	public void setRadius(Number radius) {
		this.radius = radius;
	}

}
