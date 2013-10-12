var BuildingList = Backbone.Collection.extend({
  // A building list may contain both power plants
  // and other types of buildings, hence 'Entity'.
  model: Entity,

  // Is there a building present at the given coordinates?
  buildingAt: function(x, y) {
    var result = null;
    this.each(function(building) {
      var buildingX = building.get("x"),
          buildingY = building.get("y"),
          buildingWidth = building.get("sprite").width,
          buildingHeight = building.get("sprite").height;

      if (x >= buildingX && x <= buildingX+buildingWidth &&
          y >= buildingY && y <= buildingY+buildingHeight)
        result = building;
    });

    return result;
  }
});
