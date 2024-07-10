var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.transfer && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.transfer = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.transfer && creep.store.getFreeCapacity() == 0) {
	        creep.memory.transfer = true;
	        creep.say('🚚 transfer');
	    }

        if(creep.memory.transfer) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
	}
};

module.exports = roleHarvester;