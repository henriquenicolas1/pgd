/**
 * @deprecated
 */
parserContext = {
		noSize: "no-size",
		reset: function(){
			$("#geometry").empty();
			this.simulation.reset = true;
		},
		memory: {
			get: function(prop){
				return this[prop]
			}
		},
		createClass: function(name){
			if(name == 'list'){
				var l = [];
				l["add"] = l.push;
				l["toString"] = function(){
					var result = "(list ";
					this.forEach(function(o){
						switch(typeof(o)){
							case "string":
							case "object":
								result+=o.toString()+" ";
								break;
							case "number":
								result+=o.toString().toLowerCase()+" ";
								break;
						}
					});
					return result+")";
				}
				return l;
			} else if (name=='vector3'){
				return {
					x:0,
					y:0,
					z:0,
					toString:function(){
						var result = "";
						if(this.x!=undefined){
							result+=this.x.toString().toLowerCase()+" ";
							if(this.y!=undefined){
								result+= this.y.toString().toLowerCase()+" ";
								if(this.z!=undefined){
									result+= this.z.toString().toLowerCase()+" ";
								}
							}
						}
						return result;
					}
				};
			} if(name == "run-until") {
				return {
					stepFunctions:[],
					addStepFunction:function(func){
						this.stepFunctions.push(func);
					},
					toString:function(){
						var result = "";
						if(this.time){
							result+="(run-until "+this.time+" ";
							if(this.stepFunctions.length>0){
								result+="("+this.stepFunctions.join(')(')+")";
							}
							result+=")";
						}
						return result;
					}
				};
			} else {
				return {
					getCtlClassName: function(){
						return name;
					},
					toString: function(){
						var result = "(make "+this.getCtlClassName()+" ";
						for(var i in this){
							switch(typeof(this[i])){
								case "string":
								case "object":
									result+= "("+i+" "+this[i]+")";
									break;
								case "number":
									result+= "("+i+" "+this[i].toString().toLowerCase()+")";
									break;
							}
						}
						return result+")";
					}
				};
			}
		},
		simulation: {
			reset: false,
			params: {
				toString: function(){
					var result = "";
					for(var i in this){
						switch(typeof(this[i])){
							case "string":
							case "object":
								result+="(set! "+i+" "+this[i]+")";
								break;
							case "number":
								result+="(set! "+i+" "+this[i].toString().toLowerCase()+")";
								break;
						}
					}
					return result;
				}
			},
			setParam: function(name,value){
				this.params[name] = value;
			},
			getParam: function(name){
				return this.params[name];
			},
			toString: function(){
				var result = this.reset?"(reset-meep)":"";
				result +=this.params.toString();
				if(this.runUntil){
					result+= this.runUntil.toString();
				}
				return result;
			}
		}
}