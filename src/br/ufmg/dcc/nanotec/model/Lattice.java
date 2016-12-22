package br.ufmg.dcc.nanotec.model;

import br.ufmg.dcc.nanotec.annotations.CtlProperty;

public class Lattice extends CtlObject {
	
	public static final String CTL_CLASS_NAME = "lattice";

	@CtlProperty("size")
	private Vector3 size;
	
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

}
