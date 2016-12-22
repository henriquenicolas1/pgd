package br.ufmg.dcc.nanotec.model;

import java.io.IOException;
import java.io.Writer;
import java.lang.reflect.Field;

import br.ufmg.dcc.nanotec.annotations.CtlProperty;

/**
 * Represents an object that can be translated to CTL
 * @author Jeronimo Nunes Rocha
 *
 */
public abstract class CtlObject {

	/**
	 * Should return the name of this.class in CTL context
	 * @return
	 */
	public abstract String getCtlClassName();

	/**
	 * Writes this object to CTL format
	 * @param writer The Object to be written
	 */
	public void write(Writer writer) throws IOException {
		writer.write("(make ");
		writer.write(getCtlClassName());
		writer.write(" ");
		writeProperties(this.getClass(),writer);
		writer.write(")");
	}
	
	/**
	 * Writes the properties of the given class as CTL properties
	 * @param clazz
	 * @param writer
	 * @throws IOException
	 */
	private void writeProperties(Class<?> clazz, Writer writer) throws IOException {
		Class<?> superclass = clazz.getSuperclass();
		if(superclass!=null) writeProperties(superclass, writer);
		for(Field f : clazz.getDeclaredFields()){
			f.setAccessible(true);
			CtlProperty variable = f.getAnnotation(CtlProperty.class);
			try {
				Object object = f.get(this);
				if(variable!=null && object!=null){
					writer.write("(");
					writer.write(f.getName());
					writer.write(" ");
					writeProperty(object, writer);
					writer.write(")");
				}
			} catch (IllegalArgumentException | IllegalAccessException e) {
				throw new IOException(e);
			}
		}
	}
	
	/**
	 * Writes a given object as a CTL property value
	 * @param object
	 * @param writer
	 * @throws IOException
	 */
	protected static void writeProperty(Object object,Writer writer) throws IOException{
		if(object instanceof Double){
			writer.write(object.toString().toLowerCase());
		} else if(object instanceof CtlObject){
			((CtlObject) object).write(writer);
		} else if(object instanceof CtlList){
			((CtlList) object).write(writer);
		} else {
			writer.write(object.toString());
		}
	}

}
