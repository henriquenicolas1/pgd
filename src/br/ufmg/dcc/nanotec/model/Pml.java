package br.ufmg.dcc.nanotec.model;

import br.ufmg.dcc.nanotec.annotations.CtlProperty;

public class Pml extends CtlObject {
	
	public static final String CTL_CLASS_NAME = "pml";
	
	@CtlProperty("thickness")
	private Number thickness;
	
	//TODO
//	@CtlProperty("direction")
//	private Constant direction;

	//TODO
//	@CtlProperty("boundary-side")
//	private Constant boundarySide;
	
	@CtlProperty("strength")
	private Number strength;
	
	@CtlProperty("R-asymptotic")
	private Number rAsymptotic;
	
//	@CtlProperty("pml-profile")
//	private Function pmlProfile;
	
	@Override
	public String getCtlClassName() {
		return CTL_CLASS_NAME;
	}

	public Number getThickness() {
		return thickness;
	}

	public void setThickness(Number thickness) {
		this.thickness = thickness;
	}

	public Number getStrength() {
		return strength;
	}

	public void setStrength(Number strength) {
		this.strength = strength;
	}

	public Number getrAsymptotic() {
		return rAsymptotic;
	}

	public void setrAsymptotic(Number rAsymptotic) {
		this.rAsymptotic = rAsymptotic;
	}

}
