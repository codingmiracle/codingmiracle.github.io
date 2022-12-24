var width = document.width;
var height = document.height;
var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");
var bg = document.getElementById("bg-image");

var nameplaceholder = document.getElementById("nameplaceholder");
var roleinfo = document.getElementsByClassName("role-info")[0];

//roles
var bf = "Benni";
var eb = "Alex";
var cf = ["Constantin", "Karsten"];
var f = ["Dominik", "Jan", "Mario", "Nico", "Tim", "Max", "Marie", "Hemma", "Clemens", "Flo", "Verena", "Veronika", "Jakob", "Anna", ""];
var t = ["Julia", "Prf. Kuran", "Prf. Tillich", "Prf. Birgman", "Prf. Willinger", "Prf. Peham"];
var cm = ["Rafael", "Felix", "Marco", "Daniel", "Fabian", "Melanie", "Luka", "Paul", "Yasin", "Resul", "Mark", "Harun", "Manuel", ""];
var z = ["DMZ", "Zauberer"];
var fam = ["jakob", "Ruth", "Thomas", "Marlies", "Gerald"];

// speed adjustments
var speed = 30;

//mouse
var mouseX;
var mouseY;
var mouseDown = 0;
document.body.onmousedown = function() { 
  ++mouseDown;
}
document.body.onmouseup = function() {
  --mouseDown;
}

function getParameter(parameterName) {
    let parameters = new URLSearchParams(window.location.search);
    return parameters.get(parameterName);
}

function mobileCheck() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
};

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
function roleCheck(name) {
    if(name == bf) {
        document.getElementById("v-logo").style.display = "inline";
        nameplaceholder.style.filter = "drop-shadow(0 0 10px rgb(250, 238, 75))";
        document.getElementsByClassName("role")[0].innerHTML = "My Best Friend!";
        document.getElementsByClassName("rarity")[0].innerHTML = "Die einzige Person auf der Welt die sich so bezeichnen darf! Danke für die krasse Zeit mit dir!";
        document.getElementById("prc").innerHTML = "0.2%";
    } else if(eb == name) {
        document.getElementById("v-logo").style.display = "inline";
        document.getElementById("v-logo").src = "media/angel.png"
        nameplaceholder.style.filter = "drop-shadow(0 0 10px rgb(250, 238, 75))";
        document.getElementsByClassName("role")[0].innerHTML = "Surprise!";
        document.getElementsByClassName("rarity")[0].innerHTML = "xD Jap dein Engerl war ich! Ich hoffe es dir gefallen!";
        document.getElementById("prc").innerHTML = "0.2%";
    } else if(cf.find(elm => elm == name)) {
        document.getElementById("v-logo").style.display = "inline";
        nameplaceholder.style.filter = "drop-shadow(0 0 10px rgb(250, 238, 75))";
        document.getElementsByClassName("role")[0].innerHTML = "One of my Best Friends!";
        document.getElementsByClassName("rarity")[0].innerHTML = "Du bist einer von zwei Leuten die mich so gut kennen! Danke für die Dinge die ich mt dir erleben durfte!";
        document.getElementById("prc").innerHTML = "0.4%";
    } else if(f.find(elm => elm == name)) {
        nameplaceholder.style.filter = "drop-shadow(0 0 10px rgb(250, 238, 75))";
        document.getElementsByClassName("role")[0].innerHTML = "One of my Friends!";
        document.getElementsByClassName("rarity")[0].innerHTML = "Awesome! Danke , dass du eine so nice Person bist!";
        document.getElementById("prc").innerHTML = "1%";
    } else if(t.find(elm => elm == name)) {
        nameplaceholder.style.filter = "drop-shadow(0 0 10px rgb(250, 238, 75))";
        document.getElementsByClassName("role")[0].innerHTML = "One of my Teachers!";
        document.getElementsByClassName("rarity")[0].innerHTML = "Danke für die vielen Sachen die ich von dir lernen durfte, auch wenn es nicht immer einfach war!";
        document.getElementById("prc").innerHTML = "3%";
    }  else if(cm.find(elm => elm == name)) {
        nameplaceholder.style.filter = "drop-shadow(0 0 10px rgb(250, 238, 75))";
        document.getElementsByClassName("role")[0].innerHTML = "One of my Classmates!";
        document.getElementsByClassName("rarity")[0].innerHTML = "Danke, dass 4AHELS für mich mehr als nur eine Klassenbezeichnung ist!";
        document.getElementById("prc").innerHTML = "3%";
    } else if(z.find(elm => elm == name)) {
        nameplaceholder.style.filter = "drop-shadow(0 0 10px rgb(250, 238, 75))"; 
        nameplaceholder.style.filter = "drop-shadow(0 0 10px rgb(250, 238, 75))"
        document.getElementsByClassName("role")[0].innerHTML = "A Magican!";
        document.getElementsByClassName("rarity")[0].innerHTML = "Zauberei ist eine schöne Sache - man lässt einfache Dinge unmöglich aussehen, oder umgekehrt!";
        document.getElementById("prc").innerHTML = "3%";
        
    } else if(dk.find(elm => elm == name)) {
        nameplaceholder.style.filter = "drop-shadow(0 0 10px rgb(255, 255, 255))"
        nameplaceholder.style.filter = "drop-shadow(0 0 10px rgb(250, 238, 75))"
        document.getElementsByClassName("role")[0].innerHTML = "???";
        document.getElementsByClassName("rarity")[0].innerHTML = "Awesome! Danke , dass du eine so nice Person bist! - wait, da stimmt was nicht...";
        document.getElementById("prc").innerHTML = "%%%";
    }
}

function updateSize() {
    width = window.innerWidth;
    height = window.innerHeight;
    if (width != canvas.width || height != canvas.height) {
        canvas.width = width;
        canvas.height = height;
        groundflakes = new Array();
        snowflakes = new Array();
        initSnow();
    }

}

function drawbg() {
    ctx.clearRect(0, 0, width, height);
    groundflakes.forEach(function (flake) {
        flake.draw();
    })
}

function update() {
    updateSize();
    updateSnow();
}

function draw() {
    drawbg()
    drawSnow();
    requestAnimationFrame(draw);
}

function reset() {
    // edit text by name
    nameplaceholder.innerHTML = getParameter("name");
    roleCheck(getParameter("name"));
    if(mobileCheck()) {
        bg.style.display = "none";
        document.getElementsByClassName(".tooltip.pressie")[0].style.left = 0;
        document.getElementsByClassName("overlay")[0].style.visibility = "visible";
        document.getElementsByClassName("tex-box")[0].style.fontSize = 30;
    }
    updateSize();
    initSnow();
    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    })
    nameplaceholder.addEventListener("mouseover", () => {
        roleinfo.style.visibility = "visible";
    })
    nameplaceholder.addEventListener("touchstart", () => {
        roleinfo.style.visibility = "visible";
    })
    nameplaceholder.addEventListener("click", () => {
        roleinfo.style.visibility = "visible";
    })
    nameplaceholder.addEventListener("touchend", () => {
        roleinfo.style.visibility = "visible";
    })
    nameplaceholder.addEventListener("mouseleave", () => {
        roleinfo.style.visibility = "hidden";
    })
    resetanimations();
}

requestAnimationFrame(draw);

var hupdate = setInterval(update, 1000 / speed);

reset();
