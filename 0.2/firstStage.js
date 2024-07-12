const buildSpawn = {
    0:{
        0:STRUCTURE_EXTENSION,
        1:STRUCTURE_EXTENSION,
        2:STRUCTURE_SPAWN,
        3:STRUCTURE_EXTENSION,
        4:STRUCTURE_EXTENSION
    },
    1:{
        0:STRUCTURE_EXTENSION,
        1:undefined,
        2:STRUCTURE_EXTENSION,
        3:undefined,
        4:STRUCTURE_EXTENSION
    },
    2:{
        0:undefined,
        1:STRUCTURE_EXTENSION,
        2:undefined,
        3:STRUCTURE_EXTENSION,
        4:STRUCTURE_CONTAINER
    },
    3:{
        0:STRUCTURE_EXTENSION,
        1:undefined,
        2:STRUCTURE_EXTENSION,
        3:undefined,
        4:STRUCTURE_EXTENSION
    },
    4:{
        0:STRUCTURE_EXTENSION,
        1:STRUCTURE_EXTENSION,
        2:undefined,
        3:STRUCTURE_EXTENSION,
        4:STRUCTURE_EXTENSION
    }
}

const typeWorks = {
    harvester:function(creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    },
    worker:function(creep) {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
    },
    upgrader:function(creep) {
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
}

const modules = {
    spawn:function() {
        const creeps = Object.keys(Game.creeps)
        const energyRoom = Game.spawns['Spawn1'].room.energyAvailable
        const engStorage = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION);
            }
        }).length;
        var allEnergy = engStorage * 50 + 300

        if(energyRoom >= Math.floor(allEnergy/250) * 250) {
            var bodys = []

            for(var i = 0; i < Math.floor(allEnergy/250); i++){
                bodys = bodys.concat([WORK,CARRY,MOVE,MOVE])
            }

            if(creeps.filter(elem => elem.includes("harv")).length < 2) {
                var newName = 'harv_' + Game.time;
                Game.spawns['Spawn1'].spawnCreep(bodys, newName);
            } else if(creeps.filter(elem => elem.includes("up")).length < 1) {
                var newName = 'up_' + Game.time;
                Game.spawns['Spawn1'].spawnCreep(bodys, newName);
            } else if(creeps.filter(elem => elem.includes("work")).length < 2) {
                var newName = 'work_' + Game.time;
                Game.spawns['Spawn1'].spawnCreep(bodys, newName);
            }
        }
    },
    work:function(creep) {
        const buildStruct = Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES);
        const engStruct = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });

        if(creep.memory.work && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.work = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.work && creep.store.getFreeCapacity() == 0) {
	        creep.memory.work = true;
	        creep.say('🚧 work');
	    }

        if(creep.memory.work) {
	        if(creep.name.includes("harv")) {
                if(engStruct != '') {
                    typeWorks.harvester(creep)
                } else if(buildStruct != ''){
                    typeWorks.worker(creep)
                } else {
                    typeWorks.upgrader(creep)
                }
            } 
            if((creep.name.includes("up"))) {
                typeWorks.upgrader(creep)
            }
            if((creep.name.includes("work"))) {
                if(buildStruct != '') {
                    typeWorks.worker(creep)
                } else if(engStruct != '') {
                    typeWorks.harvester(creep)
                } else {
                    typeWorks.upgrader(creep)
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
    },
    build:function() {
        const levelCont = Game.spawns['Spawn1'].room.controller.level
        const extStorage = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION);
            }
        }).length;
        const extConstSite = Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES, {
            filter: (ConstructionSite) => {
                return (ConstructionSite.structureType == STRUCTURE_EXTENSION);
            }
        }).length;
        const spawnCord = Game.spawns['Spawn1'].pos
        var screen = Game.spawns['Spawn1'].room.lookAtArea(spawnCord.y, spawnCord.x - 2, spawnCord.y + 4, spawnCord.x + 2)
        var ySh = 0

        if(levelCont == 2) {
            if(extStorage < 5 && extConstSite < 5) {
                var buildExt = 0
                for(var y in screen) {
                    var xSh = 0
                    for(var x in screen[y]) {
                        if(screen[y][x][0].type === 'terrain'){
                            if(buildSpawn[ySh][xSh] === STRUCTURE_EXTENSION && buildExt != 5){
                                Game.spawns['Spawn1'].room.createConstructionSite(Game.spawns['Spawn1'].room.getPositionAt(x, y), buildSpawn[ySh][xSh]);
                                buildExt ++
                            }
                            if (buildSpawn[ySh][xSh] != undefined && buildSpawn[ySh][xSh] != STRUCTURE_EXTENSION) {
                                Game.spawns['Spawn1'].room.createConstructionSite(Game.spawns['Spawn1'].room.getPositionAt(x, y), buildSpawn[ySh][xSh]);
                            }
                        } else if(screen[y][x][0].type === 'structure') {
                            if(screen[y][x][0].structure.structureType === buildSpawn[ySh][xSh]) {
                                //Уже построенно
                            } else {
                                //Что-то другое
                            }
                        }
                        xSh ++
                    }
                    ySh ++
                }
            }
        }
    }
}

var firstStage = {

    run: function() {
        const engStruct = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION);
            }
        }).length;
        const contStruct = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER);
            }
        }).length;

        modules.spawn()

        for(var name in Game.creeps) {
            modules.work(Game.creeps[name])
        }

        modules.build()

        if(engStruct > 4 && contStruct > 0 && Game.spawns['Spawn1'].room.controller.level > 1){
            Memory.stage = 1
        }
	}

};

module.exports = firstStage;