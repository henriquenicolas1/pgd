var ids = 0;
var simulation;
var defaultRadius;
var geoObjects = {};

function deleteSelected(){
	$(".geometric-object.selected").each(function(){
		var o = geoObjects[this.id];
		simulation.params.geometry[simulation.params.geometry.indexOf(o)] = undefined;
		geoObjects[this.id] = undefined;
		$(this).remove();
	});
}

//else if aqui (tem que corrigir primeiro)

function drop(ev){
	var tube;
	var o;
	var grid = $("#geometry");
	if(eval(ev.dataTransfer.getData("newcylinder"))){
		tube = $('<div class="geometric-object"/>');
		tube.appendTo(grid);
		o = parserContext.createClass('cylinder');
		geoObjects[ids] = o;
		tube.attr("id",ids++);
		o.height = Infinity;
		o.radius = defaultRadius;
		o.center = parserContext.createClass('vector3');
		o.center.z = null;
		o.material = parserContext.createClass('dielectric');
		o.material.epsilon = 11.56;
		tube.addClass("cylinder");
		tube.attr("ondragstart","startDragGeoObject(event)");
		tube.attr("ondrag","draggingGeoObject(event)");
		tube.attr("ondragend","endDragGeoObject(event)");
		tube.attr("draggable","true");
		tube.click(clickCylinder);
		tube.height(defaultRadius*2*simulation.getParam('resolution'));
		tube.width(defaultRadius*2*simulation.getParam('resolution'));
	} else {
		tube = $("#"+ev.dataTransfer.getData("dragged"));
		o = geoObjects[tube[0].id];
	}
	o.center.x += (event.clientX-event.dataTransfer.getData("ox"))/simulation.getParam('resolution');
	o.center.y += (event.clientY-event.dataTransfer.getData("oy"))/simulation.getParam('resolution');
	tube.css("top",o.center.y*simulation.getParam('resolution')+grid.height()/2-tube.height()/2);
	tube.css("left",o.center.x*simulation.getParam('resolution')+grid.width()/2-tube.width()/2);
}

function allowDrop(ev){
	ev.preventDefault();
}

function startDragGeoObject(event) {
	event.stopPropagation();
	event.dataTransfer.setData("dragged", event.target.id);
	event.dataTransfer.setData("newcylinder", false);
	event.dataTransfer.setData("ox",event.clientX);
	event.dataTransfer.setData("oy",event.clientY);
}

function endDragGeoObject(event){
	event.stopPropagation();
}

function draggingGeoObject(event){
	event.stopPropagation();
}

function dragnewcylinder(event) {
	event.dataTransfer.setData("newcylinder", true);
}


function updateCylinderPanel(){
	var grid = $(".cylinder.selected");
	if(grid.length == 1){
		PF('radius').jq.val(geoObjects[grid[0].id].radius);
		PF('coordinate-x').jq.val(geoObjects[grid[0].id].center.x);
		PF('coordinate-y').jq.val(geoObjects[grid[0].id].center.y);
		PF('material').jq.val(geoObjects[grid[0].id].material);
	}
	PF('layoutWidget').open('east');
}

function updateCylinders(){
	var grid = $(".cylinder.selected");
	grid.each(function(){
		var g = $(this);
		var o = geoObjects[this.id];
		o.radius = parseFloat(PF('radius').jq.val());
		g.height(o.radius*2*simulation.getParam('resolution'));
		g.width(o.radius*2*simulation.getParam('resolution'));
		
		g.css("top",o.center.y*simulation.getParam('resolution')+$("#geometry").height()/2-g.height()/2);
		g.css("left",o.center.x*simulation.getParam('resolution')+$("#geometry").width()/2-g.width()/2);
	});
}

function clickCylinder(e){
	if(e.shiftKey) {
		$(this).addClass("selected");
		var grid = $(".cylinder.selected");
		if(grid.length > 1){
			var g = $(this);
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
		$(this).addClass("selected");
	} else {
		$(".cylinder").removeClass("selected");
		$(this).addClass("selected");
	}
	updateCylinderPanel();
}

$(document).keydown(function(e) {
	if (e.ctrlKey) {
		if (e.keyCode == 65 || e.keyCode == 97) { // 'A' or 'a'
			e.stopPropagation();
			$(".cylinder").addClass("selected");
		}
	} else {
		if(e.keyCode == 46){
			deleteSelected();
		}
	}
});

$(document).ready(function(){
	PF('file').input.change(handleFileSelect);
});

function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object

	// Loop through the FileList and render image files as thumbnails.
	for (var i = 0, f; f = files[i]; i++) {

		var reader = new FileReader();

		// Closure to capture the file information.
		reader.onload = (function(theFile) {
			return function(e) {
				simulation = parser.parse(e.target.result.replace(/;.*/g,""));
				$("#geometry-lattice-name").text("( "+theFile.name.split(".ctl")[0]+" )");
				PF("simulate-button").enable();
				var grid = $("#geometry");
				grid.width(simulation.getParam('geometry-lattice').size.x*simulation.getParam('resolution'));
				grid.height(simulation.getParam('geometry-lattice').size.y*simulation.getParam('resolution'));
				for(var i in simulation.getParam('geometry')){
					var o = simulation.getParam('geometry')[i];
					if(typeof(o)=="object"){ // Some aux functions were put into the object
						var tube = $('<div class="geometric-object"/>');
						tube.appendTo(grid);
						geoObjects[ids] = o;
						tube.attr("id",ids++);
						tube.addClass(o.getCtlClassName());
						if(o.getCtlClassName()=="cylinder"){
							tube.attr("ondragstart","startDragGeoObject(event)");
							tube.attr("ondrag","draggingGeoObject(event)");
							tube.attr("ondragend","endDragGeoObject(event)");
							tube.attr("draggable","true");
							tube.click(clickCylinder);
							defaultRadius = o.radius;
							tube.height(defaultRadius*2*simulation.getParam('resolution'));
							tube.width(defaultRadius*2*simulation.getParam('resolution'));
						} else if(o.getCtlClassName() == "block"){
							tube.width(o.size.x*simulation.getParam('resolution'));
							tube.height(o.size.y*simulation.getParam('resolution'));
						}
						tube.css("top",o.center.y*simulation.getParam('resolution')+grid.height()/2-tube.height()/2);
						tube.css("left",o.center.x*simulation.getParam('resolution')+grid.width()/2-tube.width()/2);
					}
				}
				for(var i in simulation.getParam('sources')){
					var o = simulation.getParam('sources')[i];
					if(typeof(o)=="object" && o.getCtlClassName()=="source"){
						var tube = $("<div/>");
						geoObjects[ids] = o;
						tube.attr("id",ids++);
						tube.addClass("source");
						tube.attr("draggable","true");
						tube.attr("ondragstart","startDragGeoObject(event)");
						tube.attr("ondrag","draggingGeoObject(event)");
						tube.attr("ondragend","endDragGeoObject(event)");
						tube.appendTo(grid);
						tube.click(clickCylinder);
						tube.css("top",o.center.y*simulation.getParam('resolution')+grid.width()/2-tube.width()/2);
						tube.css("left",o.center.x*simulation.getParam('resolution')+grid.width()/2-tube.width()/2);
					}
				}
			};
		})(f);

		// Read in the image file as a data URL.
		reader.readAsText(f);
	}
}

function toggleOpaque(){
	var o = $(".opaque");
	o.toggleClass("opaque");
	var n = o.next();
	if(n.length==0) n = $($("#simulation").children()[0])
	n.toggleClass("opaque");
	setTimeout(toggleOpaque,1000);
}

$(document).ready(function(){
	toggleOpaque();
});

function startDragGeometry(event){
	var clone = document.createElement("div");
	clone.id = "select-block";
	clone.setAttribute("x",event.layerX);
	clone.setAttribute("y",event.layerY);
	clone.style.top = event.layerY+"px";
	clone.style.left = event.layerX+"px";
	$("#geometry").append(clone);
	event.dataTransfer.setDragImage(document.createElement("div"), 0, 0);

	return true;
}

function endDragGeometry(event){
	var clone = $("#select-block");
	var po = clone.position();
	$(".geometric-object").each(function(){
		var g = $(this);
		var p = g.position();
		g.removeClass("selected");
		if(		   p.left >= po.left 
				&& p.left+g.width() <= po.left+clone.width() 
				&& p.top >= po.top 
				&& p.top+g.height() <= po.top+clone.height()){
			g.addClass("selected");
		}
	});
	$("#select-block").remove();
}

function draggingGeometry(event){
	var clone = document.getElementById("select-block");
	var originalX = clone.getAttribute("x");
	var originalY = clone.getAttribute("y");
	var minX = Math.min(originalX,event.layerX);
	var minY = Math.min(originalY,event.layerY);
	var maxX = Math.max(originalX,event.layerX);
	var maxY = Math.max(originalY,event.layerY);
	
	clone.style.top = minY+"px";
	clone.style.left = minX+"px";
	clone.style.height = (maxY-minY)+"px";
	clone.style.width = (maxX-minX)+"px";
}