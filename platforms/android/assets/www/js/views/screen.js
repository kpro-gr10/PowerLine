var Screen = Backbone.View.extend({

  // Render the map to the context
  render: function(context) {
    context.fillStyle = 'red';
    context.fillRect(0, 0, width, height);
  }

});
