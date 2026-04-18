(function () {
  const canvas = document.getElementById('oojs-canvas');
  const ctx = canvas.getContext('2d');
  const countEl = document.getElementById('count');

  const info = document.createElement('div');
  info.style.cssText = 'position:fixed;bottom:10px;right:10px;background:#0f172a;color:white;padding:0.5rem 0.8rem;border-radius:6px;font-size:0.8rem;font-family:monospace;';
  info.textContent = 'OOJS demo';
  document.body.appendChild(info);

  class Shape {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 4;
      this.vy = (Math.random() - 0.5) * 4;
    }

    update() {
      this.vy += 0.2;
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx *= -0.9;
      if (this.y > canvas.height) {
        this.y = canvas.height;
        this.vy *= -0.85;
      }
      this.x = Math.max(0, Math.min(canvas.width, this.x));
    }

    draw() {
      throw new Error('A draw() metodust a leszarmazottnak kell implementalnia');
    }
  }

  class Circle extends Shape {
    constructor(x, y) {
      super(x, y);
      this.radius = 15 + Math.random() * 20;
      this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  class Star extends Circle {
    constructor(x, y) {
      super(x, y);
      this.points = 5;
      this.rotation = 0;
      this.color = `hsl(${Math.random() * 60 + 30}, 90%, 65%)`;
    }

    update() {
      super.update();
      this.rotation += 0.05;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      for (let i = 0; i < this.points * 2; i++) {
        const r = i % 2 === 0 ? this.radius : this.radius / 2;
        const a = (Math.PI / this.points) * i;
        ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  const shapes = [];

  function animate() {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    shapes.forEach(s => { s.update(); s.draw(); });
    countEl.textContent = shapes.length;
    requestAnimationFrame(animate);
  }

  function getXY(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  }

  canvas.addEventListener('click', (e) => {
    const { x, y } = getXY(e);
    shapes.push(e.shiftKey ? new Star(x, y) : new Circle(x, y));
  });

  document.getElementById('add-circle').addEventListener('click', () => {
    shapes.push(new Circle(Math.random() * canvas.width, 50));
  });
  document.getElementById('add-star').addEventListener('click', () => {
    shapes.push(new Star(Math.random() * canvas.width, 50));
  });
  document.getElementById('clear').addEventListener('click', () => {
    shapes.length = 0;
  });

  for (let i = 0; i < 5; i++) shapes.push(new Circle(100 + i * 120, 50));
  shapes.push(new Star(450, 50));

  animate();
})();
