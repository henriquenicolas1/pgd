//TODO Java doc
class Lattice extends CtlObject {
	
	constructor(simulation){
		super('lattice',simulation);
		
		//registering html5 drag support with EventListeners
		var element = this.JQ[0];
		element.addEventListener("drop", new LatticeDropEventListender(this));
		element.addEventListener("dragover", new LatticeDragOverEventListender(this));
		
	}
	
	set size(size){
		this.JQ.width(size.x*this.simulation.params.resolution);
		this.JQ.height(size.y*this.simulation.params.resolution);
		this._size = size;
	}
	
	get size(){
		return this._size;
	}
}

class LatticeDropEventListender {
	
	constructor(lattice){
		this.lattice = lattice;
	}
	
	handleEvent(event){
		event.stopPropagation();
		var dt = event.dataTransfer;
		if(dt.types.indexOf("block")!=-1){
			let block = CtlObject.objects[dt.getData("block")];
			let r = block.simulation.params.resolution;
			var ox = (event.clientX - dt.getData("fromX"))/r;
			var oy = (event.clientY - dt.getData("fromY"))/r;
			var po = block.JQ.offset();
			$(".cylinder,.source,.flux-region").each(function(){
				var c = CtlObject.objects[this.id];
				if(		   c.center.x >= block.center.x-block.size.x/2
						&& c.center.x <= block.center.x+block.size.x/2 
						&& c.center.y >= block.center.y-block.size.y/2
						&& c.center.y <= block.center.y+block.size.y/2){
					c.center = new Vector3(c.center.x + ox, c.center.y + oy);
				}
			});
			block.center = new Vector3(block.center.x + ox, block.center.y + oy);
		}
	}
}

class LatticeDragOverEventListender {
	
	constructor(lattice){
		this.lattice = lattice;
	}
	
	handleEvent(event){
		event.stopPropagation();
		if(event.dataTransfer.types.indexOf("block")!=-1){
			//allow drop
			event.preventDefault();
		}
	}
}

// Lattice dragging for block selection is not compactible with dragging blocks
//
//class LatticeDragStartEventListener {
//	
//	constructor(lattice){
//		this.lattice = lattice;
//	}
//	
//	handleEvent(event){
//		var latPos = this.lattice.JQ.offset();
//		var x = event.clientX - latPos.left;
//		var y = event.clientY - latPos.top;
//		var clone = document.createElement("div");
//		clone.id = "select-block";
//		clone.setAttribute("x",x);
//		clone.setAttribute("y",y);
//		clone.style.left = x+"px";
//		clone.style.top = y+"px";
//		this.lattice.JQ.append(clone);
//		event.dataTransfer.setDragImage(document.createElement("div"), 0, 0);
//	}
//}
//
//class LatticeDragEventListener {
//	
//	constructor(lattice){
//		this.lattice = lattice;
//	}
//	
//	handleEvent(event){
//		var latPos = this.lattice.JQ.offset();
//		var x = event.clientX - latPos.left;
//		var y = event.clientY - latPos.top;
//		if(x > latPos.left && y >latPos.left){ //avoid out of screen
//			var clone = document.getElementById("select-block");
//			var originalX = clone.getAttribute("x");
//			var originalY = clone.getAttribute("y");
//			var minX = Math.min(originalX,x);
//			var minY = Math.min(originalY,y);
//			var maxX = Math.max(originalX,x);
//			var maxY = Math.max(originalY,y);
//			
//			clone.style.top = minY+"px";
//			clone.style.left = minX+"px";
//			clone.style.height = (maxY-minY)+"px";
//			clone.style.width = (maxX-minX)+"px";
//		}
//	}
//}
//
//class LatticeDragEndEventListener {
//	
//	constructor(lattice){
//		this.lattice = lattice;
//	}
//	
//	handleEvent(event){
//		var clone = $("#select-block");
//		var po = clone.position();
//		$(".geometric-object").each(function(){
//			var g = $(this);
//			var p = g.position();
//			g.removeClass("selected");
//			if(		   p.left >= po.left 
//					&& p.left+g.width() <= po.left+clone.width() 
//					&& p.top >= po.top 
//					&& p.top+g.height() <= po.top+clone.height()){
//				g.addClass("selected");
//			}
//		});
//		$("#select-block").remove();
//	}
//}