var gravity = 0.2;
var risetime = 1000;
var numparticles = 50;

class Particle {
    constructor(x, y, s, c, g) {
        this.pos = {x: x, y: y};
        this.vel = {x: 0,y: 0};
        if(g) {
            this.g = gravity;
        } else {
            this.g = 0;
        }
        this.acc = {x: 0,y: this.g};
        this.size = s;
        this.tick = 0;
        this.color = c;
    }

    update() {
        this.vel.x += this.acc.x;
        this.vel.y += this.acc.y; 
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y; 
        if(this.acc.x > 0) {
            this.acc.x -= 0.1;
        } else if(this.acc.x < 0.1 && this.acc.x > -0.1) {
            this.acc.x = 0
        } else {
            this.acc.x += 0.1;
        }
        if(this.acc.y > this.g) {
            this.acc.x -= 0.1;
        } else if(this.acc.x < 0.1 + this.g && this.acc.x > this.g - 0.1) {
            this.acc.x = this.g
        } else {
            this.acc.x += 0.1;
        }
        this.tick += 1;
        if(this.tick >= 250) {
            this.tick = 0;
            this.size -= 1;
        }
    }

    applyVelocity(v) {
        this.vel.x += v.x;
        this.vel.y += v.y;
    }

    applyForce(f) {
        this.acc.x += f.x;
        this.acc.y += f.y;
    }

    cancelMomentum() {
        this.acc.x = 0;
        this.acc.y = 0;
        this.vel.x = 0;
        this.vel.y = 0;
    }

    isdead() {
        if(this.y > height || this.x < 0 || this.x > width) {
            return true;
        }
        return false;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        console.log("draw")
    }
}

var particles = new Array();


class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = "red";
        let startx = Math.floor(Math.random() * width);
        let starty = height;
        this.particles = new Array();
        this.start = new Particle(startx, starty, 10, this.color, false);
        this.start.applyVelocity({x: x/(speed * (risetime/1000)),y: y/(speed * (risetime/1000))});
    }

    draw() {
        this.particles.forEach(particle => {
            particle.draw();
        })
        if(this.start != undefined) {
            this.start.draw();
        }
    }

    update() {
        if(this.start.x != this.x && this.y != this.start.y) {
            this.start.update();
        } else {
            this.start = undefined;
            for(let i = 0; i < numparticles; i++) {
                this.particles.push(new Particle(this.x, this.y, Math.floor(Math.random() * 5 + 5)), this.color, true);
                this.particles[i].applyForce({x: Math.random(),y: Math.random()});
            }
        }
        for(let i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
            if(this.particles[i].isdead()) {
                this.particles.splice(i, 1);
            }
        }
    }

    isover() {
        return !this.particles.length & this.start == undefined;
    }
}

var  fireworks = new Array();
fireworks.push(new Firework(400, 400))

function updateFireworks() {
    fireworks.forEach(firework => {
        firework.update();
        if(firework.isover()) {
            let i = fireworks.findIndex(p => {
                p.x == firework.x && p.y == firework.y
            })
            fireworks.splice(i, 1);
        }
    })
    if(fireworks.length <= 3) {
        fireworks.push(new Firework(Math.floor(Math.random() * width), Math.floor(Math.random() * height)))
    }
}

function drawFireworks() {
    fireworks.forEach(firework => {
        firework.draw();
    })
}

function testParticles() {
    for(let i = 0; i < clicks.length; i++) {
        let pos = clicks.shift();
        particles.push(new Particle(pos.x, pos.y, Math.floor(Math.random()*5+5), getRandomColor(), true));
    }
    for(let i = 0; i < this.particles.length; i++) {
        if(this.particles[i].isdead()) {
            this.particles.splice(i, 1);
        }
    }
}