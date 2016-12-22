package br.ufmg.dcc.nanotec.model;

import br.ufmg.dcc.nanotec.annotations.CtlProperty;

public class Cylinder extends GeometricObject {
	
	public static final String CTL_CLASS_NAME = "cylinder";
	
	@CtlProperty("radius")
	private Number radius;
	
	@CtlProperty("height")
	private Number height;
	
	@CtlProperty("axis")
	private Vector3 axis;
	
	@Override
	public String getCtlClassName() {
		return CTL_CLASS_NAME;
	}

	public Number getRadius() {
		return radius;
	}

	public void setRadius(Number radius) {
		this.radius = radius;
	}

	public Number getHeight() {
		return height;
	}

	public void setHeight(Number height) {
		this.height = height;
	}

	public Vector3 getAxis() {
		return axis;
	}

	public void setAxis(Vector3 axis) {
		this.axis = axis;
	}

}