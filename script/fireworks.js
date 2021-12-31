var gravity = 0.2;
var risetime = 0.5; // in seconds
var numparticles = 50;

class Particle {
    constructor(x, y, s, c, g) {
        this.x = x;
        this.y = y;
        if (g) {
            this.g = gravity;
        } else {
            this.g = 0;
        }
        this.speedx = 0;
        this.speedy = this.g;
        this.size = s;
        this.tick = 0;
        this.color = c;
    }

    update() {
        this.speedy += this.g
        if (this.speedx > 0) {
            this.speedx -= 0.2;
        } else if (this.speedx < 0.2 && this.speedx > -0.2) {
            this.speedx = 0;
        } else {
            this.speedx += 0.2;
        }
        this.x += this.speedx;
        this.y += this.speedy;
        this.tick += 1;
        if (this.tick >= 25) {
            this.tick = 0;
            if (this.size > 1)
                this.size -= 1;
        }
    }

    applyForce(x, y) {
        this.speedx += x;
        this.speedy += y;
    }

    isdead() {
        if (this.y > height) {
            return true;
        }
        return false;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, true);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function getRandomVect(offset, multiplyer) {
    let rad = Math.random() * 2 * Math.PI;
    let length = offset + Math.floor(Math.random() * multiplyer);
    return { x: Math.cos(rad) * length, y: Math.sin(rad) * length }
}

class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = new Array();
        this.color = getRandomColor();
        this.startx = Math.random() * width;
        this.starty = height;
        this.dx = Math.floor(this.x - this.startx) / (speed * risetime * 0.66);
        this.dy = Math.floor(this.y - this.starty) / (speed * risetime * 0.66);
        if (mobileCheck()) {
            this.dx = Math.floor(this.x - this.startx) / (speed * risetime);
            this.dy = Math.floor(this.y - this.starty) / (speed * risetime);
        }
        this.isExploded = false;
        setTimeout(() => { this.createExplosion() }, risetime * 1000);
    }

    draw() {
        this.particles.forEach(function (p) {
            p.draw();
        })
        if (!this.isExploded) {
            ctx.beginPath();
            ctx.arc(this.startx, this.starty, 15, 0, 2 * Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    update() {
        if (!this.isExploded) {
            this.startx += this.dx;
            this.starty += this.dy;
        } else {
            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].update();
                if (this.particles[i].isdead()) {
                    this.particles.splice(i, 1);
                }
            }
        }
    }

    createExplosion() {
        for (let i = 0; i < numparticles; i++) {
            let vect = getRandomVect(5, 5);
            this.particles.push(new Particle(this.x, this.y, Math.random() * 5 + 5, this.color, true));
            this.particles[this.particles.length - 1].applyForce(vect.x, vect.y);
        }
        this.isExploded = true;
    }

    isover() {
        if (this.particles.length == 0 && this.isExploded) {
            return true;
        }
        return false;
    }
}

var fireworks = new Array();

function drawFireworks() {
    fireworks.forEach(function (f) {
        f.draw();
    })
}

function handleNewFireworks() {
    while (fireworks.length < 5) {
        if (clicks.length) {
            let pos = clicks.shift();
            fireworks.push(new Firework(pos.x, pos.y));
        }
        else {
            fireworks.push(new Firework(Math.random() * width, Math.random() * height));
        }
    }
}

function updateFireworks() {
    for (let i = 0; i < fireworks.length; i++) {
        this.fireworks[i].update();
        if (this.fireworks[i].isover()) {
            this.fireworks.splice(i, 1);
        }
    }
}