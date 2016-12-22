package br.ufmg.dcc.nanotec.model;

import br.ufmg.dcc.nanotec.annotations.CtlProperty;

public class Medium extends MaterialType {

	public static final String CTL_CLASS_NAME = "medium";
	
	@CtlProperty("epsilon")
	private Number epsilon;

	@Override
	public String getCtlClassName() {
		return CTL_CLASS_NAME;
	}

	public Number getEpsilon() {
		return epsilon;
	}

	public void setEpsilon(Number epsilon) {
		this.epsilon = epsilon;
	}
}
