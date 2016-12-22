var lista;
$(document).keydown(function(event) {
    if( event.keyCode === 67) {
    	$(".cylinder.selected").each(function(){
    		var c = CtlObject.getObject(this.id);
    		var clone = c.clone();
    		simulation.addGeometricObject(clone);
    	});
    }
});