var Map = Backbone.Model.extend({
  defaults: {
    "width": 0,  // the total width of the map
    "height": 0, // the total height of the map

    // Is the viewport smaller than the total size of the map?
    // I.e., have we zoomed in on part of the map?
    "zoomed": true,

    // The top left corner in zoomed mode:
    "viewXPosition": 0,
    "viewYPosition": 0,

    // The size of the zoomed window:
    "viewWidth": 0,
    "viewHeight": 0,

    // The (CSS) background image:
    "background": undefined,

    // The buildings placed on the map:
    "buildings": new Backbone.Collection
  },

  update: function(dt) {
    var buildings=this.get("buildings");
    for(var i=0; i<buildings.length; i++) {
        buildings.at(i).update(dt);
    }
  },

  translateView: function(dx, dy) {
    // Get current values
    var viewX = this.get("viewXPosition"),
        viewY = this.get("viewYPosition"),
        viewWidth = this.get("viewWidth"),
        viewHeight = this.get("viewHeight"),
        mapWidth = this.get("width"),
        mapHeight = this.get("height");

    // Update current values
    viewX += dx;
    viewY += dy;

    // Make sure the new values are valid. Don't allow scrolling outside the map.
    if(viewX < 0) {viewX = 0;}
    else if(viewX >= (mapWidth - viewWidth)) {viewX = mapWidth-viewWidth;}
    if(viewY < 0) {viewY = 0;}
    else if(viewY >= (mapHeight - viewHeight)) {viewY = mapHeight-viewHeight;}

    // Set model values
    this.set("viewXPosition", viewX);
    this.set("viewYPosition", viewY);
    },

    getBuildingAt: function(sx, sy) {
        var mapX=sx+this.get("viewXPosition"),
            mapY=sy+this.get("viewYPosition"),
            buildings=this.get("buildings");
        for(var i=0; i<buildings.length; i++) {
            if(buildings.at(i).contains(mapX, mapY)) {
                return buildings.at(i);
            }
        }
        return undefined;
    }

});
