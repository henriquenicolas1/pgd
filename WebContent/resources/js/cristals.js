function makeAir(){
	var grid = $(".TUBE.selected,.AIR.selected");
	grid.removeClass("TUBE");
	grid.addClass("AIR");
}

function makeTube(){
	var grid = $(".TUBE.selected,.AIR.selected");
	grid.removeClass("AIR");
	grid.addClass("TUBE");
}

function select(e){
	if(e.shiftKey) {
		$(this).addClass("selected");
		var grid = $(".TUBE.selected,.AIR.selected");
		if(grid.length > 1){
			var g = $(this);
			var minx = parseInt(g.attr("x"));
			var miny = parseInt(g.attr("y"));
			var maxx = minx;
			var maxy = miny;
			grid.each(function(){
				var g = $(this);
				var x = parseInt(g.attr("x"));
				var y = parseInt(g.attr("y"));
				if(x < minx) minx = x;
				if(y < miny) miny = y;
				if(x > maxx) maxx = x;
				if(y > maxy) maxy = y;
			});
			grid = $(".TUBE,.AIR");
			grid.each(function(){
				var g = $(this);
				var x = parseInt(g.attr("x"));
				var y = parseInt(g.attr("y"));
				g.removeClass("selected");
				if(x >= minx && x <= maxx && y >= miny && y <= maxy) g.addClass("selected");
			});
		}
	} else if(e.ctrlKey) {
		$(this).addClass("selected");
	} else {
		$(".AIR,.TUBE").removeClass("selected");
		$(this).addClass("selected");
	}
}

$(document).ready(function(){
	var grid = $(".AIR,.TUBE");
	$(document).keydown(function(e) {
		if (e.ctrlKey) {
			if (e.keyCode == 65 || e.keyCode == 97) { // 'A' or 'a'
				e.stopPropagation();
				grid.addClass("selected");
			}
		} else {
			if(e.keyCode == 46){
				makeAir();
			}
		}
	});
	grid.contextmenu(select);
	grid.click(select);
});