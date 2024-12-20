AFRAME.registerComponent("glow", {
    schema: {
      color: { default: "#ffffff", type: "color" },
      intensity: { default: 1.0 },
    },
    init: function () {
      this.el.addEventListener(
        "object3dset",
        function () {
          this.update();
        }.bind(this)
      );
    },
    update: function () {
      var data = this.data;
      this.el.object3D.traverse(function (node) {
        if (node.isMesh) {
          node.material.emissive.copy(new THREE.Color(data.color));
          node.material.emissiveIntensity = data.intensity;
        }
      });
    },
  });

  AFRAME.registerComponent("levitate", {
    tick: function (t, dt) {
      var mesh = this.el.getObject3D("mesh");
      if (!mesh) return;
      mesh.rotation.y += (0.1 * dt) / 1000;
      mesh.position.y = 0.25 * Math.sin(t / 1000);
    },
  });