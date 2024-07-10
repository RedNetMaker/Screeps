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
            if(creep.pos.isEqualTo(26,22)) {
                creep.drop(RESOURCE_ENERGY);
            } else {
                creep.moveTo(26, 22, {visualizePathStyle: {stroke: '#ffaa00'}});
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