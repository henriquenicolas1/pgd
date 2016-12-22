function createObjetct(){
	PF("newDialog").hide();
	setTimeout(function(){
		var newSimulation = {
				type : PF('a').getSelectedValue(), //ok
				//height : parseFloat(PF('y').getJQ().val()), //ok
				//width : parseFloat(PF('x').getJQ().val()), //ok
				radius : parseFloat(PF('b').getJQ().val()), //ok
				db : parseFloat(PF('c').getJQ().val()), //ok
				dh : parseFloat(PF('d').getJQ().val()), //ok
				lattice : parseFloat(PF('e').getJQ().val()), //ok
				rows : parseInt(PF('f').getJQ().val()), //ok
				columns : parseInt(PF('g').getJQ().val()), //ok
				resolution : parseFloat(PF('h').getJQ().val()), //ok
				//run : PF('i').getJQ().val(), //falta
				//beg : PF('j').getSelectedValue(),//falta
				//end : PF('k').getSelectedValue(), //falta
				//step : PF('l').getJQ().val(), //falta
				pml : PF('m').getJQ().val(), //ok
		};
	
		function calcBlockSizeWidth(obj){
			return obj.rows*obj.lattice + obj.radius;
		}
	
		function calcBlockSizeHeight(obj){
			return obj.columns*obj.lattice + obj.radius;
		}
	
		
		CtlObject.clearCache();
		simulation = new Simulation();
		loadSimulation(simulation);
			
		var l = new Lattice(simulation); 
		l.size = new Vector3((calcBlockSizeWidth(newSimulation)+ newSimulation.lattice),(calcBlockSizeHeight(newSimulation)+ newSimulation.lattice),new NoSize()); 
		simulation.params["geometry-lattice"] = l;
	
		var list = new CtlList(simulation);
	
		var b = new Block(simulation);
		b.center.x = 0;
		b.center.y = 0;
		b.size = new Vector3(calcBlockSizeWidth(newSimulation),calcBlockSizeHeight(newSimulation),Infinity);
		b.material = new Medium(simulation);
		b.material.epsilon = newSimulation.db;
		list.add(b);
	
		var startx = (-b.size.x/2) + newSimulation.lattice/2;
		var starty = (-b.size.y/2) + newSimulation.lattice/2;
		if(newSimulation.type === "0") {
			var posy = starty;
			for(var y = 0; y<newSimulation.columns;y++){
				var posx = startx;
				for(var x = 0; x<newSimulation.rows; x++){
					var c = new Cylinder(simulation);
					c.radius = newSimulation.radius;
					c.center = new Vector3(posx,posy,null);
					c.height = Infinity;
					c.material = new Medium(simulation);
					c.material.epsilon = newSimulation.dh;
					list.add(c);
					posx+=newSimulation.lattice;
				}
				posy+=newSimulation.lattice;
			}	
		} else {
			var posy = starty;
			for(var y = 0; y<newSimulation.columns;y++){
				var posx = startx + ((y%2==1)?newSimulation.lattice/2:0);
				for(var x = y%2; x<newSimulation.rows; x++){
					var c = new Cylinder(simulation);
					c.radius = newSimulation.radius;
					c.center = new Vector3(posx,posy,Infinity);
					c.height = Infinity;
					c.material = new Medium(simulation);
					c.material.epsilon = newSimulation.dh;
					list.add(c);
					posx+=newSimulation.lattice;
				}
				posy+=newSimulation.lattice;
			}
		}
	
		simulation.params.geometry = list;
		simulation.params.sources = new CtlList(simulation);
		
		var p = new Pml(simulation);
		p.thickness = newSimulation.pml;
		var list_pml = new CtlList(simulation);
		list_pml.add(p);
		simulation.params["pml-layers"] = list_pml;
		
		
		simulation.params.resolution = newSimulation.resolution;
		
		PF("simulate-button").enable();
		clear();
	},0);
}