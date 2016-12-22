parserContext = {
		noSize: new NoSize(),
		reset: function(){
			this.simulation = new Simulation();
		},
		memory: {
			get: function(prop){
				return this[prop]
			}
		},
		createClass: function(name){
			switch (name) {
				case "list":
					return new CtlList(this.simulation);
					break;
				case "vector3":
					return new Vector3();
				case "run-until":
					return new RunUntil();
				case "cylinder":
					return new Cylinder(this.simulation);
				case "block":
					return new Block(this.simulation);
				case "lattice":
					return new Lattice(this.simulation);
				case "medium":
				case "dielectric":
					return new Medium(this.simulation);
				case "source":
					return new Source(this.simulation);
				case "continuous-src":
					return new ContinuousSrc(this.simulation);
				case "pml":
					return new Pml(this.simulation);
				case "add-flux":
					return new AddFlux();
				case "flux-region":
					return new FluxRegion(this.simulation);
				default:
					throw new SyntaxError('Undeclared ctl class ' + name);
			}
		}
}