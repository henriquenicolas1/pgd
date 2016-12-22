package br.ufmg.dcc.nanotec.model;

import br.ufmg.dcc.nanotec.annotations.CtlProperty;

public class Block extends GeometricObject {
	
	public static final String CTL_CLASS_NAME = "block";
	
	@CtlProperty("size")
	private Vector3 size;
	
	@CtlProperty("e1")
	private Vector3 e1;
	
	@CtlProperty("e2")
	private Vector3 e2;
	
	@CtlProperty("e3")
	private Vector3 e3;
	
	@Override
	public String getCtlClassName() {
		return CTL_CLASS_NAME;
	}

	public Vector3 getSize() {
		return size;
	}

	public void setSize(Vector3 size) {
		this.size = size;
	}

	public Vector3 getE1() {
		return e1;
	}

	public void setE1(Vector3 e1) {
		this.e1 = e1;
	}

	public Vector3 getE2() {
		return e2;
	}

	public void setE2(Vector3 e2) {
		this.e2 = e2;
	}

	public Vector3 getE3() {
		return e3;
	}

	public void setE3(Vector3 e3) {
		this.e3 = e3;
	}

}
