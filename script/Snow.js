var maxFlakes = 200;
maxFlakeSize = 10;

class Snowflake {
    constructor(h) {
        this.x = Math.floor(Math.random() * width);
        this.y = h;
        this.size = Math.floor(Math.random() * maxFlakeSize);
        this.itensity = Math.floor((Math.random() * 8) + 2) / 10;
        this.g = Math.floor(Math.random() * 4) + 1;
        this.behavior = Math.floor((Math.random() * 2) - 1);
        ctx = canvas.getContext("2d");
    }

    update() {
        this.y += this.g;
        this.x += this.behavior;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255, 255, 255, ' + this.itensity + ')'
        ctx.fill();
    }

    hitsGround() {
        if (this.y >= height || this.x < 0 || this.x > width) {
            return 1;
        }
        return 0;
    }
}

var snowflakes = new Array();
var groundflakes = new Array();

function initSnow() {
    snowflakes = new Array();
    groundflakes = new Array();
    for (let i = 0; i < maxFlakes; i++) {
        snowflakes.push(new Snowflake(Math.floor(Math.random() * height)));
    }

    for (let i = 0; i < Math.floor(width / 40); i++) {
        groundflakes.push(new Snowflake(height))
        groundflakes[i].itensity = 1;
    }
}

function updateSnow() {
    for (let i = 0; i < snowflakes.length; i++) {
        snowflakes[i].update();
        if (snowflakes[i].hitsGround()) {
            snowflakes.splice(i, 1);
        }
    }

    while (snowflakes.length < maxFlakes) {
        snowflakes.push(new Snowflake(-10));
    }

}

function drawSnow() {
    snowflakes.forEach(function (snowflake) {
        snowflake.draw();
    })
}
