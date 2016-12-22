package br.ufmg.dcc.nanotec.ctl.parser;

import br.ufmg.dcc.nanotec.model.Simulation;

/**
 * Represents a Parser capable of translating CTL
 * @author Jeronimo Nunes Rocha
 *
 */
public interface Parser {

	/**
	 * Parses a CTL and returns a Simulation Object
	 * @param s A string with the CTL espec
	 * @return
	 */
	public Simulation parse(String s);
}
