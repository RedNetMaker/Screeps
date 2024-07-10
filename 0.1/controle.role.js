var change = function(build, harvest) {
    for(var name in Game.creeps) {
        if(harvest != 0) {
            Game.creeps[name].memory.role = "harvester";
            harvest -= 1;
        } else if(build != 0){
            Game.creeps[name].memory.role = "builder";
            build -= 1;
        } else {
            Game.creeps[name].memory.role = "upgrader";
        }
    }
}
var controleRole = {
    run: function() {
        var workers = Object.keys(Game.creeps).length
        if(workers > 1){
            workers -= 1;
        }
        var engStruct = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        var buildStruct = Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES);
        if(engStruct == '' && buildStruct != '') {
            if(_.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length != workers){
                change(workers, 0)
            }
        } else if(engStruct != '' && buildStruct == '') {
            if(_.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length != workers){
                change(0, workers)
            }
        } else if(engStruct != '' && buildStruct != '') {
            if(_.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length != Math.floor(workers / 2)){
                var half = Math.floor(workers / 2)
                change(half, half)
            }
        } else {
            if(_.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader').length != Math.floor(Object.keys(Game.creeps).length)){
                change(0, 0)
            }
        }
	}
};

module.exports = controleRole;