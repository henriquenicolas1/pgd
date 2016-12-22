package br.ufmg.dcc.nanotec.annotations;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

/**
 * Identifies a field of a class as a CTL Property
 * @author Jeronimo Nunes Rocha
 *
 */
@Retention(RetentionPolicy.RUNTIME)
public @interface CtlProperty {

	/**
	 * The CTL Property that specifies the class field
	 * @return
	 */
	String value();

}
