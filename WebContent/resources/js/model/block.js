//TODO Java doc
class Block extends GeometricObject {
	
	constructor(simulation) {
		super('block',simulation);
		
		//registering html5 drop support with EventListeners
		var element = this.JQ[0];
		element.addEventListener("drop", new BlockDropEventListender(this));
		element.addEventListener("click", new BlockClickEventListener(this));
		element.addEventListener("dblclick", new BlockDoubleClickEventListener(this));
		element.addEventListener("dragover", new BlockDragOverEventListender(this));
		element.addEventListener("dragstart", new BlockDragStartEventListender(this));
		element.draggable = true;
	}
	
	//@Override
	redraw(){
		this.size = this.size;
		super.redraw();
	}

	set size(size){
		var r = this.simulation.params.resolution;
		this.JQ.width(size.x*r);
		this.JQ.height(size.y*r);
		this._size = size;
	}
	
	get size(){
		return this._size;
	}
	
	set e1(e1){
		this._e1 = e1;
	}
	
	get e1(){
		return this._e1;
	}
	
	set e2(e2){
		this._e2 = e2;
	}
	
	get e2(){
		return this._e2;
	}
	
	set e3(e3){
		this._e3 = e3;
	}
	
	get e3(){
		return this._e3;
	}
}

//The following classes implements EventListener interface
//As specified in http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventListener

class BlockDropEventListender {
	
	constructor(block){
		this.block = block;
	}
	
	handleEvent(event){
		event.stopPropagation();
		var dt = event.dataTransfer;
		if(dt.types.indexOf("cylinder")!=-1){
			let cylinder = CtlObject.objects[dt.getData("cylinder")];
			let r = cylinder.simulation.params.resolution;
			let x = cylinder.center.x + (event.clientX - dt.getData("fromX"))/r;
			let y = cylinder.center.y + (event.clientY - dt.getData("fromY"))/r;
			cylinder.center = new Vector3(x,y);
		}
	}
}

class BlockDragOverEventListender {
	
	constructor(block){
		this.block = block;
	}
	
	handleEvent(event){
		event.stopPropagation();
		if(event.dataTransfer.types.indexOf("cylinder")!=-1){
			//allow drop
			event.preventDefault();
		}
	}
}

class BlockDragStartEventListender {
	
	constructor(block){
		this.block = block;
	}
	
	handleEvent(event){
		event.dataTransfer.setData("block",this.block.id);
		event.dataTransfer.setData("fromX",event.clientX);
		event.dataTransfer.setData("fromY",event.clientY);
	}
}

class BlockClickEventListener {
	
	constructor(block){
		this.block = block;
	}
	
	handleEvent(event){
		switch(PF("cursor-buttons").getJQ().find(":checked").val()){
			case "cylinder":
				var c = new Cylinder(this.block.simulation);
				PF('cylinder-id').jq.val(c.id);
				PF('coordinate-x').jq.val((event.layerX-this.block.JQ.width()/2)/this.block.simulation.params.resolution + this.block.center.x);
				PF('coordinate-y').jq.val(-1*((event.layerY-this.block.JQ.height()/2)/this.block.simulation.params.resolution + this.block.center.y));
				updateCylinders();
				this.block.simulation.addGeometricObject(c);
			break;
			case "flux-region":
				var f = new FluxRegion(this.block.simulation);
				PF('fluxRegion-id').jq.val(f.id);
				PF('fluxRegion-center-x').jq.val((event.layerX-this.block.JQ.width()/2)/this.block.simulation.params.resolution + this.block.center.x);
				PF('fluxRegion-center-y').jq.val(-1*((event.layerY-this.block.JQ.height()/2)/this.block.simulation.params.resolution + this.block.center.y));
				updateFluxRegion();
				this.block.simulation.addFluxRegion(f);		
			break;
			case "source":
				var s = new Source(this.block.simulation);
				s.src = new ContinuousSrc(this.block.simulation);
				PF('source-id').jq.val(s.id); 
				PF('source-center-x').jq.val((event.layerX-this.block.JQ.width()/2)/this.block.simulation.params.resolution + this.block.center.x);
				PF('source-center-y').jq.val(-1*((event.layerY-this.block.JQ.height()/2)/this.block.simulation.params.resolution + this.block.center.y));
				updateSource();
				this.block.simulation.addSource(s);
			break;
		}
	}
}

class BlockDoubleClickEventListener {
	
	constructor(block){
		this.block = block;
	}
	
	handleEvent(event){
		PF('block-id').jq.val(this.block.id);
		for(var propertyName in this.block) {
			if(propertyName[0] == '_'){
				if(propertyName == '_size'){
					PF('block-size-x').jq.val(this.block.size.x);
					PF('block-size-y').jq.val(this.block.size.y);
				}
				else if(propertyName == '_center'){
					PF('block-center-x').jq.val(this.block.center.x);
					PF('block-center-y').jq.val(this.block.center.y);
				}
				else{
					PF("block-" + propertyName.substring(1)).jq.val(this.block[propertyName]);
				}	   
			 } 
		}
		$("#source-pane").hide();
		$("#source-update-pane").hide();
		$("#cylinder-pane").hide();
		$("#cylinder-update-pane").hide();
		$("#fluxRegion-pane").hide();
		$("#fluxRegion-update-pane").hide();
		PF('layoutWidget').open('east');
		$("#block-pane").show();
		$("#block-update-pane").show();
	}
}

function updateBlock(){
	
	var block = CtlObject.getObject(PF('block-id').jq.val());
	for(var propertyName in block) {
		if(propertyName[0] == '_'){
			   if(propertyName == '_center'){
				   block.center.x = PF('block-center-x').jq.val();
				   block.center.y = PF('block-center-y').jq.val();
			   }else if(propertyName == '_size'){
				   block.size.x = PF('block-size-x').jq.val();
				   block.size.y = PF('block-size-y').jq.val();
			   }
			   else{
				   block[propertyName] = PF("block-" +propertyName.substring(1)).jq.val();
			   }
		}   
	}
	block.redraw();
}