AFRAME.registerComponent('trigger-logging', {
    init: function () {
        this.el.addEventListener('triggerchanged', this.logTrigger);
    },
    logTrigger: function (evt) {
      console.log(evt);
    }
  });
