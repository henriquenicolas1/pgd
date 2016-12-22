package br.ufmg.dcc.nanotec.model;

public class NoSize extends Number {
	
	private static final long serialVersionUID = 1L;
	
	private static final Number INSTANCE = new NoSize();
	
	private NoSize() {
		
	}

	public static Number getInstance() {
		return INSTANCE;
	}

	@Override
	public int intValue() {
		return 0;
	}

	@Override
	public long longValue() {
		return 0;
	}

	@Override
	public float floatValue() {
		return 0;
	}

	@Override
	public double doubleValue() {
		return 0;
	}
	
	@Override
	public String toString() {
		return "no-size";
	}

}
