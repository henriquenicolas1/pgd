function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object

	// Loop through the FileList and render image files as thumbnails.
	for (var i = 0, f; f = files[i]; i++) {

		var reader = new FileReader();

		// Closure to capture the file information.
		reader.onload = (function(theFile) {
			return function(e) {
				loadSimulation(e.target.result.replace(/;.*/g,""));
			};
		})(f);

		// Read in the image file as a data URL.
		reader.readAsText(f);
	}
}

function downloadCtl(){
	document.location = 'data:Application/octet-stream,' +
    encodeURIComponent(simulation.toString());
}

function deleteSelected(){
	$(".selected").each(function(){
		var id = this.id;
		if(id){
			var o = CtlObject.objects[id];
			if(o) o.remove();
		}
	});
}

function loadSimulation(s){
	simulation = undefined;
	if(s instanceof Simulation) simulation = s;
	else if(typeof(s)=="string") simulation = parser.parse(s);
	$(".simulation").remove();
	if(simulation != undefined) {
		$("#editorForm").append(simulation.JQ);
		PF("simulate-button").enable();
		PF("download-button").enable();
	}
}

$(document).ready(function(){
	var buttons = $(".cursor-buttons div span");
	buttons.addClass("fa");
	$(buttons[0]).addClass("fa-location-arrow");
	$(buttons[1]).addClass("fa-circle-o");
	$(buttons[2]).addClass("fa-sun-o");
	$(buttons[3]).addClass("fa-square-o");
	PF('file').input.change(handleFileSelect);
	$(document).keyup( e=>{
	    if(e.keyCode == 46) {
	    	deleteSelected();
	    }
	});
	window.addEventListener("beforeunload", e=>{
		clear();
	})
});

function cursorButtonChange(){
	$("#block-pane").hide();
	$("#block-update-pane").hide();
	$("#source-pane").hide();
	$("#source-update-pane").hide();
	$("#fluxRegion-pane").hide();
	$("#fluxRegion-update-pane").hide();
	$("#cylinder-pane").hide();
	$("#cylinder-update-pane").hide();
	switch(PF("cursor-buttons").getJQ().find(":checked").val()) {
		case "cylinder":
			$("#cylinder-pane").show();
			if(PF('radius').getJQ().val()=="") PF('radius').getJQ().val(PF('b').getJQ().val());
			if(PF('height').getJQ().val()=="") PF('height').getJQ().val(Infinity);
			if(PF('material').getJQ().val()=="") PF('material').getJQ().val(PF('d').getJQ().val());
			PF('layoutWidget').open('east');
			PF('layoutWidget').close('east_south');
		break;
		case "flux-region":
			$("#fluxRegion-pane").show();
			if(PF('fluxRegion-size-x').getJQ().val()=="") PF('fluxRegion-size-x').getJQ().val(2.5);
			if(PF('fluxRegion-size-y').getJQ().val()=="") PF('fluxRegion-size-y').getJQ().val(2.5);
			if(PF('fluxRegion-direction').getJQ().val()=="") PF('fluxRegion-direction').getJQ().val("X");
			PF('layoutWidget').open('east');
			PF('layoutWidget').close('east_south');
		break;
		case "source":
			$("#source-pane").show();
			if(PF('source-src').getJQ().val()=="") PF('source-src').getJQ().val(1.346153846);
			if(PF('source-component').getJQ().val()=="") PF('source-component').getJQ().val("Ez");
			PF('layoutWidget').open('east');
			PF('layoutWidget').close('east_south');
		break;
		default:
			PF('layoutWidget').close('east');
			PF('layoutWidget').open('east_south');
		break;
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

function updateSpeed(){
	
}

$(document).ready(function(){
	toggleOpaque();
});
