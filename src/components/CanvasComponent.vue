<template>
  <canvas id="canvas" ref="canvas" />
</template>

<script>
// import { drawTheWeather } from "../resources/canvas/canvas";

export default {
  name: "CanvasComponent",
  data: () => ({}),
  props: ["weatherInfo"],
  mounted: function() {
    const canvas = document.querySelector("canvas");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");

    var raindropLength = 70;
    var raindropCount = 200;
    var rainAngle = -10;
    // var currentCursor = 0;
    const lightningBoltCount = 50;
    const cloudsCount = 50;
    const cloudRadius = 20;
    // const snowflakeCount = 130;
    // const snowAngle = -50;
    // const snowflakeSize = 30;
    // const rayCount = 8;

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      initRain();
      initLightning();
      initClouds();
    //   initSnow();
    //   initSun();
    });

    class RainDrop {
      constructor(x, y, draindrop) {
        this.x = x;
        this.y = -y;
        this.dx = draindrop;
        this.dy = draindrop;
      }

      draw() {
        const dropBaseLength = 50;
        const dropCurveRadius = raindropLength / 8;
        const dropCurveStartAngle = -rainAngle * (Math.PI / 180);

        ctx.beginPath();
        ctx.arc(
          this.x - rainAngle,
          this.y + dropBaseLength,
          dropCurveRadius,
          dropCurveStartAngle,
          dropCurveStartAngle + Math.PI,
          false
        );
        ctx.lineTo(this.x - rainAngle * 3, this.y);
        ctx.closePath();

        ctx.fillStyle = "#BFF4F7";
        ctx.fill();

        ctx.strokeStyle = "#99EDF3";
        ctx.stroke();
      }

      update() {
        if (this.x - raindropLength > innerWidth || this.y > innerHeight) {
          this.x = innerWidth - this.x;
          this.y = -raindropLength;
        }
        this.x += this.dx * rainAngle * 0.01;
        this.y += this.dy;

        this.draw();
      }
    }

    class LightningBolt {
      constructor(x, dy, size) {
        this.x = x;
        this.y = -30;
        this.dy = dy;
        this.size = size;
      }

      draw() {
        ctx.beginPath();

        const getScaledCoordinate = coordinate => {
          return coordinate * this.size;
        };

        ctx.moveTo(getScaledCoordinate(this.x), getScaledCoordinate(this.y));
        ctx.lineTo(
          getScaledCoordinate(this.x - 20),
          getScaledCoordinate(this.y + 20)
        );
        ctx.lineTo(
          getScaledCoordinate(this.x),
          getScaledCoordinate(this.y + 20)
        );
        ctx.lineTo(
          getScaledCoordinate(this.x - 20),
          getScaledCoordinate(this.y + 60)
        );
        ctx.lineTo(
          getScaledCoordinate(this.x + 40),
          getScaledCoordinate(this.y + 10)
        );
        ctx.lineTo(
          getScaledCoordinate(this.x + 20),
          getScaledCoordinate(this.y + 10)
        );
        ctx.lineTo(
          getScaledCoordinate(this.x + 30),
          getScaledCoordinate(this.y)
        );

        ctx.closePath();

        ctx.fillStyle = "gold";
        ctx.fill();

        ctx.strokeStyle = "orange";
        ctx.stroke();
      }

      update() {
        if (this.y > 30 || this.y < -30) {
          this.dy = -this.dy;
        }
        this.y += this.dy;

        this.draw();
      }
    }

    class Cloud {
      constructor(x, y, dx, size) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.size = size;
        this.scaledRadius = cloudRadius * this.size;
        this.scaledBaseLength = 2 * this.scaledRadius * (Math.sqrt(2) + 1);
      }

      draw() {
        ctx.beginPath();

        //base line
        ctx.moveTo(this.x, this.y + this.scaledRadius);
        ctx.lineTo(this.x + this.scaledBaseLength, this.y + this.scaledRadius);
        //right curve
        ctx.arc(
          this.x + this.scaledBaseLength - this.scaledRadius / Math.sqrt(2),
          this.y + this.scaledRadius - this.scaledRadius / Math.sqrt(2),
          this.scaledRadius,
          Math.PI / 4,
          (Math.PI * 5) / 4,
          true
        );

        //middle top curve
        ctx.arc(
          this.x +
            this.scaledBaseLength -
            this.scaledRadius -
            2 * (this.scaledRadius / Math.sqrt(2)),
          this.y + this.scaledRadius - (2 * this.scaledRadius) / Math.sqrt(2),
          this.scaledRadius,
          0,
          Math.PI,
          true
        );

        //left curve
        ctx.arc(
          this.x + this.scaledRadius / Math.sqrt(2),
          this.y + this.scaledRadius - this.scaledRadius / Math.sqrt(2),
          this.scaledRadius,
          -Math.PI / 4,
          (Math.PI * 3) / 4,
          true
        );

        // ctx.fillStyle = `rgb(169,169,169)`;
        ctx.fillStyle = `lightblue`;
        ctx.fill();

        ctx.strokeStyle = "gray";
        ctx.stroke();

        ctx.closePath();
      }

      update() {
        const curveSagitta =
          this.scaledRadius * ((Math.sqrt(2) - 1) / Math.sqrt(2));
        if (this.x + this.scaledBaseLength + curveSagitta < 0) {
          this.x = innerWidth + curveSagitta;
        }
        this.x -= this.dx;
        this.draw();
      }
    }

    // class Snowflake {
    //   constructor(x, y, sizeScaler, dSnowflake) {
    //     this.x = x;
    //     this.y = y;
    //     this.size = snowflakeSize * sizeScaler;
    //     this.dx = dSnowflake;
    //     this.dy = dSnowflake;
    //   }

    //   draw() {
    //     ctx.beginPath();

    //     for (let theta = 0; theta < 2 * Math.PI; theta += Math.PI / 4) {
    //       ctx.moveTo(this.x, this.y);

    //       let newXCoordinate = this.x + (this.size / 2) * Math.cos(theta);
    //       let newYCoordinate = this.y + (this.size / 2) * Math.sin(theta);

    //       ctx.lineTo(newXCoordinate, newYCoordinate);

    //       ctx.moveTo(this.x, this.y);

    //       let subPatternXCoordinate =
    //         this.x + (this.size / 3) * Math.cos(theta);
    //       let subPatternYCoordinate =
    //         this.y + (this.size / 3) * Math.sin(theta);

    //       ctx.moveTo(subPatternXCoordinate, subPatternYCoordinate);
    //       ctx.lineTo(
    //         subPatternXCoordinate +
    //           (this.size / 6) * Math.cos(theta + Math.PI / 4),
    //         subPatternYCoordinate +
    //           (this.size / 4) * Math.sin(theta + Math.PI / 4)
    //       );

    //       ctx.moveTo(subPatternXCoordinate, subPatternYCoordinate);
    //       ctx.lineTo(
    //         subPatternXCoordinate -
    //           (this.size / 6) * Math.cos(theta + Math.PI / 4),
    //         subPatternYCoordinate -
    //           (this.size / 4) * Math.sin(theta + Math.PI / 4)
    //       );

    //       ctx.strokeStyle = "lightblue";
    //       ctx.stroke();
    //     }
    //   }

    //   update() {
    //     if (
    //       this.x + this.size / 2 < 0 ||
    //       this.y - this.size / 2 > innerHeight
    //     ) {
    //       this.x = innerWidth - this.x;
    //       this.y = -this.size / 2;
    //     }
    //     this.x += this.dx * snowAngle * 0.001;
    //     this.y += this.dy;

    //     this.draw();
    //   }
    // }

    // class Sun {
    //   constructor(x, y, r, dRayAngle) {
    //     this.x = x;
    //     this.y = y;
    //     this.r = r;
    //     this.dRayAngle = dRayAngle;
    //     this.rayAngle = (2 * Math.PI) / rayCount;
    //   }

    //   draw() {
    //     ctx.beginPath();
    //     ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    //     ctx.fillStyle = "#FFE656";
    //     ctx.fill();
    //     ctx.closePath();

    //     ctx.lineWidth = 2;

    //     ctx.beginPath();
    //     for (
    //       let preTheta = 0;
    //       preTheta < 2 * Math.PI;
    //       preTheta += this.rayAngle
    //     ) {
    //       const theta = preTheta + (this.dRayAngle * 180) / Math.PI;

    //       const fromCoordinate = 1.5 * this.r;
    //       const toCoordinate = 2.85 * this.r;

    //       ctx.moveTo(
    //         this.x + Math.cos(theta) * fromCoordinate,
    //         this.y + Math.sin(theta) * fromCoordinate
    //       );
    //       ctx.lineTo(
    //         this.x + Math.cos(theta) * toCoordinate,
    //         this.y + Math.sin(theta) * toCoordinate
    //       );
    //     }

    //     ctx.strokeStyle = "#FFE656";
    //     ctx.stroke();
    //   }

    //   update() {
    //     if (this.dRayAngle === 2 * Math.PI) {
    //       this.dRayAngle = 0;
    //     }

    //     this.dRayAngle += 45 / Math.PI;

    //     this.draw();
    //   }
    // }

    var raindropArray = [];
    var lighningBoltArray = [];
    var cloudsArray = [];
    var snowflakeArray = [];
    let createdSun;

    function initRain() {
      raindropArray = [];
      for (var p = 0; p < raindropCount; p++) {
        var x = Math.random() * innerWidth;
        var y = 50;
        var draindrop = Math.random() * 13; //velocity
        // var dy = Math.random() * 15; //velocity
        const createdRaindrop = new RainDrop(x, y, draindrop);
        raindropArray.push(createdRaindrop);
      }
    }

    function initLightning() {
      lighningBoltArray = [];
      for (var p = 0; p < lightningBoltCount; p++) {
        var x = Math.random() * innerWidth;
        var dy = Math.random() * 2; //velocity
        var size = Math.random() * 5;
        const createdBolt = new LightningBolt(x, dy, size);
        lighningBoltArray.push(createdBolt);
      }
    }

    function initClouds() {
      cloudsArray = [];
      for (var p = 0; p < cloudsCount; p++) {
        var x = Math.random() * innerWidth;
        var y = Math.random() * (innerHeight / 10);
        var dx = Math.random() * 2;
        var size = Math.random() * 5;

        const createdCloud = new Cloud(x, y, dx, size);
        cloudsArray.push(createdCloud);
      }
    }

    // function initSnow() {
    //   snowflakeArray = [];
    //   for (var p = 0; p < snowflakeCount; p++) {
    //     var x = Math.random() * innerWidth;
    //     var y = -50;
    //     var sizeScaler = Math.random() * 1.3;
    //     var dSnowflake = Math.random() * 10; //velocity

    //     const createdSnowflake = new Snowflake(x, y, sizeScaler, dSnowflake);
    //     snowflakeArray.push(createdSnowflake);
    //   }
    // }

    // function initSun() {
    //   const x = innerWidth / 2;
    //   const y = innerHeight / 4;
    //   const r = innerHeight / 20;
    //   const dRayAngle = 180 / Math.PI;

    //   createdSun = new Sun(x, y, r, dRayAngle);
    // }

    function animate() {
      requestAnimationFrame(animate);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let g = 0; g < raindropArray.length; g++) {
        raindropArray[g].update();
      }

      for (let g = 0; g < lighningBoltArray.length; g++) {
        lighningBoltArray[g].update();
      }

      for (let g = 0; g < snowflakeArray.length; g++) {
        snowflakeArray[g].update();
      }

      for (let g = 0; g < cloudsArray.length; g++) {
        cloudsArray[g].update();
      }

      if (createdSun) {
        createdSun.update();
      }
    }

    initRain();
    initLightning();
    initClouds();
    // initSnow();
    // initSun();

    animate();
  }
};
</script>

<style scoped>
canvas {
  width: 100%;
  min-height: inherit;
}
</style>