package br.ufmg.dcc.nanotec.model;

import br.ufmg.dcc.nanotec.annotations.CtlProperty;

/**
 * TODO Javadoc as Meep reference
 * @author Jeronimo Nunes Rocha
 *
 */
public class GeometricObject extends CtlObject {
	
	public static final String CTL_CLASS_NAME = "geometric-object";

	@CtlProperty("material")
	private MaterialType material;
	
	@CtlProperty("center")
	private Vector3 center;
	
	@Override
	public String getCtlClassName() {
		return CTL_CLASS_NAME;
	}

	public MaterialType getMaterial() {
		return material;
	}

	public void setMaterial(MaterialType material) {
		this.material = material;
	}

	public Vector3 getCenter() {
		return center;
	}

	public void setCenter(Vector3 center) {
		this.center = center;
	}

}
