
module.exports.loop = function () {
    let ret = PathFinder.search(Game.spawns['Spawn1'].pos, Game.spawns['Spawn1'].room.find(FIND_SOURCES))
}

Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
    filter: (structure) => {
        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
    }
});
_.map(creep.room.find(FIND_SOURCES), function(source) {
    // We can't actually walk on sources-- set `range` to 1 
    // so we path next to it.
    return { pos: source.pos, range: 1 };
  });