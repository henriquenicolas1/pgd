//TODO Java doc and expand class
class Source extends CtlObject {
	
	constructor(simulation){
		super("source",simulation);
		//this.src = undefined;
		//this.component = undefined;
		this.center = new Vector3();
		
		var element = this.JQ[0];
		element.addEventListener("dblclick", new SourceDoubleClickEventListender(this));
	}
	
	get src(){
		return this._src;
	}
	
	set src(src){
		this._src = src;
	}
	
	get component(){
		return this._component;
	}
	
	set component(component){
		this._component = component;
	}
	
	get center(){
		return this._center;
	}
	
	set center(center){
		this._center = center;
		var s = this.simulation;
		var r = s.params['resolution'];
		var g = s.params['geometry-lattice'];
		// jQuery.height|width does undesirable calculations
		// This will set the css property without the calculations
		var h = Source.height*this.simulation.params['resolution'];
		var w = Source.width*this.simulation.params['resolution'];
		this.JQ[0].style.height = h+"px";
		this.JQ[0].style.width = w+"px";
		
		//this.JQ.css("top",-1*this.simulation.params.geometry.objects[0]._center.y*r+(g.size.y*r-h)/2);
		//this.JQ.css("left",this.simulation.params.geometry.objects[0]._center.x*r+(g.size.x*r-w)/2);
		this.JQ.css("top",-1*center.y*r+(g.size.y*r-h)/2);
		this.JQ.css("left",center.x*r+(g.size.x*r-w)/2);
	}
	
	redraw(){
		this.center = this.center;
	}
}
class SourceDoubleClickEventListender {
	
	constructor(source){
		this.source = source;
	}
	
	handleEvent(event){
		
		PF('source-id').jq.val(this.source.id);
		PF('source-center-x').jq.val(this.source.center.x);
		PF('source-center-y').jq.val(this.source.center.y);
		PF("source-src").jq.val(this.source.src.frequency);
		PF("source-component").jq.val(this.source.component);
		
		$("#block-pane").hide();
		$("#block-update-pane").hide();
		$("#cylinder-pane").hide();
		$("#cylinder-update-pane").hide();
		$("#fluxRegion-pane").hide();
		$("#fluxRegion-update-pane").hide();
		PF('layoutWidget').open('east');
		$("#source-pane").show();
		$("#source-update-pane").show();
	}
}

function updateSource(){
	var source = CtlObject.getObject(PF('source-id').jq.val());
	source.center = new Vector3(
			   parseFloat(PF('source-center-x').jq.val()),
			   parseFloat(PF('source-center-y').jq.val())
	);
	source.src = new ContinuousSrc(source.simulation);
	source.src.frequency = PF("source-src").jq.val();
	source.component = PF("source-component").jq.val();
	source.redraw();
}
Source.height = 2.5;
Source.width = 2.5;