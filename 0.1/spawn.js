var Spawn = {
    run: function() {
        var workers = Object.keys(Game.creeps).length
        var engStorage = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION);
            }
        }).length;
        if(engStorage < 5){
            if(Game.spawns['Spawn1'].room.energyAvailable >= 250) {
                if(workers < 7){
                    var newName = 'Worker' + Game.time;
                    console.log('Spawning new worker: ' + newName);
                    Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
                        {memory: {role: 'worker'}});
                }
            }
        } else {
            if(Game.spawns['Spawn1'].room.energyAvailable >= 500) {
                if(workers < 5){
                    var newName = 'WorkerBig' + Game.time;
                    console.log('Spawning new big worker: ' + newName);
                    Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
                        {memory: {role: 'worker'}});
                }
            }
        }
    }
};

module.exports = Spawn;