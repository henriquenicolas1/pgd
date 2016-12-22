package br.ufmg.dcc.nanotec.model;

import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

public class CtlList {
	
	public static final String CTL_CLASS_NAME = "list";
	
	private List<CtlObject> objects = new ArrayList<>();

	public String getCtlClassName() {
		return CTL_CLASS_NAME;
	}
	
	public void add(CtlObject object){
		objects.add(object);
	}
	
	public CtlObject get(int i) {
		return objects.get(i);
	}
	
	public void write(Writer writer) throws IOException {
		writer.write("(list ");
		for(Object o : objects){
			CtlObject.writeProperty(o, writer);
		}
		writer.write(")");
	}

}
