/*Referente a expressao add-flux do ctl pro meep
 * Nao eh um ctl object mas coloquei _ pq vai parar no arquivo ctl.
 * 
 */

class AddFlux{
	constructor(){
		this._regions = [];
	}
	
	set fcen(fcen){
		this._fcen = fcen;
	}
	
	get fcen(){
		return this._fcen;
	}
	
	set df(df){
		this._df = df;
	}
	
	get df(){
		return this._df;
	}
	
	set nfreq(nfreq){
		this._nfreq = nfreq;
	}
	
	get nfreq(){
		return this._nfreq;
	}
	
	addRegion(reg){
		reg.addflux = this;
		this._regions.push(reg);
	}
	
	[Symbol.iterator]() {
		return this._regions[Symbol.iterator]();
	}
	
	toString(){
		var result = ( "(add-flux " + this.fcen
		              + " " + this.df
		              + " " + this.nfreq);
		this._regions.forEach(function(r){
			result += r.toString();
		});
		return result+")";
	}
	
	
}