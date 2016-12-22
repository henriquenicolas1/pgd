package br.ufmg.dcc.nanotec.model;

import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;

import br.ufmg.dcc.nanotec.annotations.CtlProperty;

public class AddFlux{
	
	public static final String CTL_CLASS_NAME = "add-flux";
	
	@CtlProperty("regions")
	private ArrayList<FluxRegion> regions;
	
	public AddFlux(){
		this.regions = new ArrayList<>();
	}
	
	@CtlProperty("fcen")
	private double fcen;
	
	@CtlProperty("df")
	private double df;
	
	@CtlProperty("nfreq")
	private int nfreq;
	
	public double getFcen(){
		return this.fcen;
	}
	
	public void setFcen(double fcen){
		this.fcen = fcen;
	}
	
	public double getDf(){
		return this.df;
	}
	
	public void setDf(double df){
		this.df = df;
	}
	
	public int getNfreq(){
		return this.nfreq;
	}
	
	public void setNfreq(int nfreq){
		this.nfreq = nfreq;
	}
	
	public void addRegion(FluxRegion region){
		this.regions.add(region);
	}
	
	public void write(Writer writer) throws IOException {
		writer.write("(add-flux "+fcen+" "+df+" "+nfreq);
		for(Object o : regions){
			CtlObject.writeProperty(o, writer);
		}
		writer.write(")");
	}
	
}