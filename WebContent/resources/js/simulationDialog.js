function openSimulationDialog() {
	PF('simulationDialog').show();
	try {
		$(PF("step").input[0]).val(simulation.runUntil.time);
		$(PF("each").input[0]).val(simulation.runUntil.getAtEvery());
	} catch (e) {
		
	}
}

function startSimulation(){
	PF("simulationDialog").hide();
	simulation.runUntil = new RunUntil($(PF("step").input[0]).val());
	simulation.runUntil.stepFunctions = ["at-every "+$(PF("each").input[0]).val()+" output-efield-z"];
	simulate([{name:'ctl',value:simulation.toString()}]);
}