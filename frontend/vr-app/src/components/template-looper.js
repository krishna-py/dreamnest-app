/**
 * Swap template with mask animation.
 */
AFRAME.registerComponent('template-looper', {
    // array + single property schema does not appear to work.
    // See: https://github.com/aframevr/aframe/issues/5242
    schema: {
      list: { type: 'array' }    
    },
  
    init: function () {
      this.index = 0;
    },
  
    tick: function (time) {
      // Swap every second.
      var self = this;
      if (time - this.time < 2000) { return; }
      this.time = time;
  
      // Set template.
      setTimeout(function () {
        self.el.setAttribute('template', 'src', self.data.list[self.index++]);
        if (self.index === self.data.list.length) { self.index = 0; }
      }, 200);
    }
  });