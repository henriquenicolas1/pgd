package br.ufmg.dcc.nanotec.jsf;

import java.io.File;
import java.io.FileWriter;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.Writer;

import javax.faces.application.Resource;
import javax.faces.application.ResourceHandler;
import javax.faces.application.ResourceHandlerWrapper;
import javax.faces.context.FacesContext;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

import org.apache.commons.io.FileUtils;

import br.ufmg.dcc.nanotec.ctl.parser.ParserFactory;

/**
 * Class responsible for intercepting resource request to the server
 * and dynamically treating them
 * @author Jeronimo Nunes Rocha
 *
 */
public class PGDResourceHandler extends ResourceHandlerWrapper {

	private ResourceHandler wrapped;

	public PGDResourceHandler(ResourceHandler wrapped) {
		this.wrapped = wrapped;
	}

	@Override
	public ResourceHandler getWrapped() {
		return this.wrapped;
	}

	@Override
	public Resource createResource(String resourceName, String libraryName) {
		if("js".equals(libraryName)&&"parser.js".equals(resourceName)){
			File grammar = new File(ParserFactory.class.getResource("ParserGrammar.peg").getFile());
			File file = new File(FacesContext.getCurrentInstance().getExternalContext().getRealPath("resources"+File.separator+libraryName+File.separator+resourceName));
			file.getParentFile().mkdirs();
			if(!file.exists() || file.lastModified()<grammar.lastModified()){
				try (InputStream is = ParserFactory.class.getResourceAsStream("peg-0.9.0.min.js");
						Reader reader = new InputStreamReader(is);
						Writer writer = new FileWriter(file)){
					ScriptEngineManager manager = new ScriptEngineManager();
					ScriptEngine jsEngine = manager.getEngineByName("JavaScript");
					jsEngine.eval(reader);
					jsEngine.put("grammar", FileUtils.readFileToString(grammar));
					Object parser = jsEngine.eval("PEG.buildParser(grammar,{output:\"source\"})");
					writer.write("parser=");
					writer.write(parser.toString());
				} catch (Exception e){
					e.printStackTrace();
				}
			}
		} else if("HDF".equals(libraryName)) {
			return new HDFResource(resourceName, libraryName);
		}
		return super.createResource(resourceName, libraryName);
	}


}
