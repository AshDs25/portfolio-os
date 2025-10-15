// MatrixEffect.js
class Symbol {
  constructor(x, y, fontSize, canvasHeight) {
    this.characters =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //♔♕♖♗♘☀☁❆♪♫
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.text = "";
    this.canvasHeight = canvasHeight;
    this.rowSpeed = 50;
  }

  draw(ctx, delta) {
    this.text = this.characters.charAt(
      Math.floor(Math.random() * this.characters.length)
    );
    ctx.save();
    ctx.textAlign = "center";
    ctx.font = this.fontSize + "px monospace";

    // glow
    ctx.shadowColor = "#0aff0a";
    ctx.shadowBlur = 10;

    // bright core
    ctx.fillStyle = "#0aff0a";
    ctx.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);

    ctx.restore();

    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
      this.y = 0;
    } else {
      this.y += this.rowSpeed * (delta / 1000);
    }
  }
}

class Effect {
  constructor(canvasWidth, canvasHeight, fontSize) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = fontSize;
    this.columns = Math.floor(this.canvasWidth / this.fontSize);
    this.symbols = [];
    this.#initialize();
  }

  #initialize() {
    for (let i = 0; i < this.columns; i++) {
      this.symbols[i] = new Symbol(
        i, //x
        Math.floor((Math.random() * this.canvasHeight) / this.fontSize), //random y
        this.fontSize,
        this.canvasHeight
      );
    }
  }

  resize(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.columns = Math.floor(this.canvasWidth / this.fontSize);
    this.symbols = [];
    this.#initialize();
  }
}

export class MatrixEffect {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.effect = new Effect(canvas.width, canvas.height, 16);

    this.lastTime = 0;
    this.fps = 30;
    this.nextFrame = 1000 / this.fps;
    this.timer = 0;
    this.animationId = null;

    window.addEventListener("resize", () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.effect.resize(this.canvas.width, this.canvas.height);
    });
  }

  start() {
    const animate = (timeStamp) => {  
      const deltaTime = timeStamp - this.lastTime;
      this.lastTime = timeStamp;

      if (this.timer > this.nextFrame) {
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // this.ctx.fillStyle = "#0aff0a";
        // this.ctx.textAlign = "center";
        // this.ctx.font = this.effect.fontSize + "px monospace";

        this.effect.symbols.forEach((symbol) =>
          symbol.draw(this.ctx, deltaTime)
        );

        this.timer = 0;
      } else {
        this.timer += deltaTime;
      }

      this.animationId = requestAnimationFrame(animate);
    };

    animate(0);
  }

  stop() {
    cancelAnimationFrame(this.animationId);
  }
}
