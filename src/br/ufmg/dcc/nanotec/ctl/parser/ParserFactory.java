package br.ufmg.dcc.nanotec.ctl.parser;

import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;

import javax.script.Bindings;
import javax.script.Compilable;
import javax.script.CompiledScript;
import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import org.apache.commons.io.FileUtils;

public class ParserFactory {

	private final CompiledScript parser;
	private final ScriptEngine engine;
	private static ParserFactory instance;

	/**
	 * This class will be a Singleton, when constructing it will read the Grammars and compile the scripts
	 */
	private ParserFactory() {
		try (InputStream pegIs = ParserFactory.class.getResourceAsStream("peg-0.9.0.min.js");
				Reader pegReader = new InputStreamReader(pegIs)){
			ScriptEngineManager manager = new ScriptEngineManager();
			engine = manager.getEngineByName("JavaScript");
			Bindings compilingGrammarScope = engine.createBindings();
			engine.eval(pegReader,compilingGrammarScope);
			compilingGrammarScope.put("parserGrammar", FileUtils.readFileToString(new File(ParserFactory.class.getResource("ParserGrammar.peg").getFile())));
			Compilable compilable = (Compilable) engine;
			parser = compilable.compile(engine.eval("PEG.buildParser(parserGrammar,{output:\"source\"})",compilingGrammarScope).toString());
			compilingGrammarScope.clear();
		} catch (Exception e){
			throw new RuntimeException(e);
		}
	}

	/**
	 * Method to recover the Singleton
	 * @return
	 */
	public static ParserFactory getInstance() {
		if(instance==null) instance = new ParserFactory();
		return instance;
	}

	private ScriptEngine getEngine() {
		return engine;
	}

	private Invocable getInvocable() {
		return (Invocable) engine;
	}

	public Parser buildParser() {
		try {
			Bindings binds = getEngine().createBindings();
			Parser parser = getInvocable().getInterface(this.parser.eval(binds),Parser.class);
			binds.put("parserContext", new ParserContext());
			return parser;
		} catch (ScriptException e){
			throw new RuntimeException(e);
		}
	}

}
