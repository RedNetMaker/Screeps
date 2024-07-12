var preStage = require('preStage');

module.exports.loop = function () {

    if(Object.keys(Game.creeps).length === 0) {
        Memory.stage = 0
    }

    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.name,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    if(Memory.stage === 0){
        preStage.run()
    }
    if(Memory.stage === 1){
        console.log("Stage 1")
    }
}