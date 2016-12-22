package br.ufmg.dcc.nanotec.model;

public class Vector3 {

	public static final String CTL_CLASS_NAME = "vector3";

	private Number x;
	
	private Number y;
	
	private Number z;
	
	public Vector3() {
		
	}
	
	public Vector3(Number x, Number y, Number z) {
		super();
		this.x = x;
		this.y = y;
		this.z = z;
	}

	public Number getX() {
		return x;
	}

	public void setX(Number x) {
		this.x = x;
	}

	public Number getY() {
		return y;
	}

	public void setY(Number y) {
		this.y = y;
	}

	public Number getZ() {
		return z;
	}

	public void setZ(Number z) {
		this.z = z;
	}
	
	@Override
	public String toString() {
		if(x==null) return null;
		StringBuilder builder = new StringBuilder().append(x.toString().toLowerCase());
		if(y!=null){
			builder.append(" ").append(y.toString().toLowerCase());
			if(z!=null) {
				builder.append(" ").append(z.toString().toLowerCase()).toString();
			}
		}
		return builder.toString();
	}

}
