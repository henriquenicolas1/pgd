package br.ufmg.dcc.nanotec.model;

import br.ufmg.dcc.nanotec.annotations.CtlProperty;

public class FluxRegion extends CtlObject {

	public static final String CTL_CLASS_NAME = "flux-region";

	
	@CtlProperty("center")
	private Vector3 center;
	
	@CtlProperty("size")
	private Vector3 size;
	
	@CtlProperty("direction")
	private char direction;
	
	@Override
	public String getCtlClassName() {
		return CTL_CLASS_NAME;
	}
	
	public Vector3 getCenter(){
		return this.center;
	}
	
	public void setCenter(Vector3 center){
		this.center = center;
	}
	
	public Vector3 getSize(){
		return this.size;
	}
	
	public void setSize(Vector3 size){
		this.size = size;
	}
	
	public char getDirection(){
		return this.direction;
	}
	
	public void setDirection(char direction){
		this.direction = direction;
	}

}