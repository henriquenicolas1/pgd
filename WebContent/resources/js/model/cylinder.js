/**
 * Class that represents a cylinder,
 * Holds data and edits GUI when a setter is called
 */
class Cylinder extends GeometricObject {
	
	/**
	 * (constructor)
	 * @param simulation The simulation that this cylinder belongs to
	 */
	constructor(simulation){
		super('cylinder',simulation);
		this.radius = undefined;
		this.height = undefined;
		//registering html5 drag support with EventListeners
		var element = this.JQ[0];
		element.addEventListener("dragstart", new CylinderDragStartEventListender(this));
		element.addEventListener("dblclick", new CylinderDoubleClickEventListender(this));
		element.addEventListener("click", new CylinderClickEventListender(this));
		element.draggable = true;
	}
	
	//@Override
	redraw(){
		this.radius = this.radius;
		super.redraw();
	}
	
	get radius() {
		return this._radius;
	}

	set radius(radius) {
		this._radius = radius;
		var d = radius*2*this.simulation.params.resolution + "px";
		// jQuery.height|width does undesirable calculations
		// This will set the css property without the calculations
		this.JQ[0].style.height = d;
		this.JQ[0].style.width = d;
	}

	get height() {
		return this._height;
	}

	set height(height) {
		this._height = height;
	}

	get axis() {
		return this._axis;
	}

	set axis(axis) {
		this._axis = axis;
	}
	clone(){
		var x = new Cylinder(this.simulation);
		for(var propertyName in this) {
			if(propertyName[0] == '_'){
					propertyName = propertyName.substring(1);
				   if(propertyName == 'center'){
					   x.center = new Vector3(this.center.x+1,this.center.y+1);
				   } else {
					   x[propertyName] = this[propertyName];
				   }
			}   
		}
		return x;
	}
	
}

function updateCylinders(){
	
	var cylinder = CtlObject.getObject(PF('cylinder-id').jq.val());
	for(var propertyName in cylinder) {
		
		if(propertyName[0] == '_'){
			propertyName = propertyName.substring(1);
		   if(propertyName == 'center'){
			   cylinder.center = new Vector3(
				   parseFloat(PF('coordinate-x').jq.val()),
				   parseFloat(PF('coordinate-y').jq.val())
			   );
		   } else {
			   cylinder[propertyName] = PF(propertyName).jq.val();
		   }
		}   
	}
	cylinder.redraw();
}

//The following classes implements EventListener interface
//As specified in http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventListener

class CylinderDoubleClickEventListender {
	
	constructor(cylinder){
		this.cylinder = cylinder;
	}
	
	handleEvent(event){
		
		PF('cylinder-id').jq.val(this.cylinder.id);
		for(var propertyName in this.cylinder) {
			   if(propertyName[0] == '_'){
				   if(propertyName == '_center'){
					   PF('coordinate-x').jq.val(this.cylinder.center.x);
					   PF('coordinate-y').jq.val(this.cylinder.center.y);
				   }else{
					   PF(propertyName.substring(1)).jq.val(this.cylinder[propertyName]);
				   }
				   
			   }   
			}
		$("#block-pane").hide();
		$("#block-update-pane").hide();
		$("#source-pane").hide();
		$("#source-update-pane").hide();
		$("#fluxRegion-pane").hide();
		$("#fluxRegion-update-pane").hide();
		PF('layoutWidget').open('east');
		$("#cylinder-pane").show();
		$("#cylinder-update-pane").show();
	}
}

class CylinderClickEventListender {
	
	constructor(cylinder){
		this.cylinder = cylinder;
	}
	
	handleEvent(e){
		if(e.shiftKey) {
			this.cylinder.JQ.addClass("selected");
			var grid = $(".cylinder.selected");
			if(grid.length > 1){
				var g = this.cylinder.JQ;
				var minx = parseInt(g.css("left"));
				var miny = parseInt(g.css("top"));
				var maxx = minx;
				var maxy = miny;
				grid.each(function(){
					var g = $(this);
					var x = parseInt(g.css("left"));
					var y = parseInt(g.css("top"));
					if(x < minx) minx = x;
					if(y < miny) miny = y;
					if(x > maxx) maxx = x;
					if(y > maxy) maxy = y;
				});
				grid = $(".cylinder");
				grid.each(function(){
					var g = $(this);
					var x = parseInt(g.css("left"));
					var y = parseInt(g.css("top"));
					g.removeClass("selected");
					if(x >= minx && x <= maxx && y >= miny && y <= maxy) g.addClass("selected");
				});
			}
		} else if(e.ctrlKey) {
			this.cylinder.JQ.addClass("selected");
		} else {
			$(".cylinder").removeClass("selected");
			this.cylinder.JQ.addClass("selected");
		}
	}
}

class CylinderDragStartEventListender {
	
	constructor(cylinder){
		this.cylinder = cylinder;
	}
	
	handleEvent(event){
		event.dataTransfer.setData("cylinder",this.cylinder.id);
		event.dataTransfer.setData("fromX",event.clientX);
		event.dataTransfer.setData("fromY",event.clientY);
	}
}