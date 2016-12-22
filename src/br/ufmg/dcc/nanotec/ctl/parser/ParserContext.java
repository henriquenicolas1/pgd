package br.ufmg.dcc.nanotec.ctl.parser;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;

import br.ufmg.dcc.nanotec.model.AddFlux;
import br.ufmg.dcc.nanotec.model.Block;
import br.ufmg.dcc.nanotec.model.ContinuousSrc;
import br.ufmg.dcc.nanotec.model.CtlList;
import br.ufmg.dcc.nanotec.model.Cylinder;
import br.ufmg.dcc.nanotec.model.FluxRegion;
import br.ufmg.dcc.nanotec.model.GeometricObject;
import br.ufmg.dcc.nanotec.model.Lattice;
import br.ufmg.dcc.nanotec.model.MaterialType;
import br.ufmg.dcc.nanotec.model.Medium;
import br.ufmg.dcc.nanotec.model.NoSize;
import br.ufmg.dcc.nanotec.model.Pml;
import br.ufmg.dcc.nanotec.model.RunUntil;
import br.ufmg.dcc.nanotec.model.Simulation;
import br.ufmg.dcc.nanotec.model.Source;
import br.ufmg.dcc.nanotec.model.Vector3;

public class ParserContext {

	private static Map<String,Class<?>> ctlClasses = new HashMap<>();
	public static HashSet<String> set = new HashSet<>();

	static {
		ParserContext.ctlClasses.put(Lattice.CTL_CLASS_NAME, Lattice.class);
		ParserContext.ctlClasses.put(MaterialType.CTL_CLASS_NAME, MaterialType.class);
		ParserContext.ctlClasses.put(Source.CTL_CLASS_NAME, Source.class);
		ParserContext.ctlClasses.put(Medium.CTL_CLASS_NAME, Medium.class);
		ParserContext.ctlClasses.put("dielectric", Medium.class);
		ParserContext.ctlClasses.put(Vector3.CTL_CLASS_NAME, Vector3.class);
		ParserContext.ctlClasses.put(GeometricObject.CTL_CLASS_NAME, GeometricObject.class);
		ParserContext.ctlClasses.put(Block.CTL_CLASS_NAME, Block.class);
		ParserContext.ctlClasses.put(Cylinder.CTL_CLASS_NAME, Cylinder.class);
		ParserContext.ctlClasses.put(ContinuousSrc.CTL_CLASS_NAME, ContinuousSrc.class);
		ParserContext.ctlClasses.put(Pml.CTL_CLASS_NAME, Pml.class);
		ParserContext.ctlClasses.put(CtlList.CTL_CLASS_NAME, CtlList.class);
		ParserContext.ctlClasses.put(RunUntil.CTL_CLASS_NAME, RunUntil.class);
		ParserContext.ctlClasses.put(AddFlux.CTL_CLASS_NAME, AddFlux.class);
		ParserContext.ctlClasses.put(FluxRegion.CTL_CLASS_NAME, FluxRegion.class);
	}

	private Simulation simulation;
	private Map<String,Object> memory;

	public ParserContext() {
		simulation = new Simulation();
		memory = new HashMap<>();
	}

	public void reset() {
		this.memory = new HashMap<>();
		this.getSimulation().reset();
	}

	public Object createClass(String ctlClass){
		try {
			return ctlClasses.get(ctlClass).newInstance();
		} catch (Exception e) {
			System.out.println("ERRO AO CRIAR CLASSE: "+ ctlClass);
			return null;
		}
	}

	public Map<String,Object> getMemory() {
		return memory;
	}

	public void setMemory(Map<String,Object> memory) {
		this.memory = memory;
	}

	public Simulation getSimulation() {
		return simulation;
	}

	public void setSimulation(Simulation simulation) {
		this.simulation = simulation;
	}
	
	public Number getNoSize(){
		return NoSize.getInstance();
	}

}
