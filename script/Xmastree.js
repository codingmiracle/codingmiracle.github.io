var lines = document.getElementsByClassName("line");
var present = document.getElementsByClassName("pressie");
var bubbles = document.getElementsByClassName("bauble");
var tooltips = document.getElementsByClassName("tooltip");

class Bubble {

    constructor(query) {
        this.query = query;
        this.x = query.getBoundingClientRect().left;
        this.y = query.getBoundingClientRect().top;
        this.size = query.getBoundingClientRect().width;
        this.dragElement(query);
    }

    onbubble(x, y) {
        let xdiff = this.x - mouseX;
        let ydiff = this.y - mouseY;
        if(Math.pow(xdiff, 2) + Math.pow(ydiff, 2) <= Math.pow(this.size, 2)) {
            return true;
        }
        return false;
    }

    dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            // if present, the header is where you move the DIV from:
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            // otherwise, move the DIV from anywhere inside the DIV:
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
    
}

var dbubbles = new Array();


function decorateTree() {
    tooltips[1].style.visibility = "hidden";
    setTimeout(() => {
        tooltips[0].style.visibility = "visible";
        tooltips[0].style.animation = "fall-in 1.5s";
        if(!mobileCheck()) {
            document.getElementsByClassName("box")[0].style.animation = "fall-in .5s";
            document.getElementsByClassName("box")[0].style.visibility = "visible";
        }
    }, 500);
    for(let  i = 0; i<5;i++) {
        bubbles[i].style.backgroundColor = getRandomColor();
        if(mobileCheck()) {
            bubbles[i].style.display = "none";
        }
        let size = Math.floor(Math.random() * 10) + 10;
        bubbles[i].style.width = size;
        bubbles[i].style.height = size;
        bubbles[i].style.left = i*20 + "px";
    }
    for(let i = 0; i < lines.length; i++) {
        lines[i].style.visibility = "visible";
    }
    for(let i = 0; i < bubbles.length; i++) {
        if(i>5) {
            setTimeout(() => {
                bubbles[i].style.animation = "zoom-in 0.5s";
                bubbles[i].style.visibility = "visible";
            }, Math.random()*1000);
        } else {
            setTimeout(() => {
                bubbles[i].style.animation = "zoom-in 0.5s";
                bubbles[i].style.visibility = "visible";
            }, (Math.random()*500) + 500);
        }
        dbubbles.push(new Bubble(bubbles[i]));
    }
    
    console.log(dbubbles);
}

function resetanimations() {
    tooltips[0].style.visibility = "hidden";
    tooltips[0].style.animation = "";
    tooltips[1].style.visibility = "visible";
    document.getElementsByClassName("box")[0].style.animation = "";
        document.getElementsByClassName("box")[0].style.visibility = "hidden";
    for(let i = 0; i < lines.length; i++) {
        lines[i].style.visibility = "hidden";
    }
    for(let i = 0; i < bubbles.length; i++) {
        setTimeout(() => {
            bubbles[i].style.animation = "";
            bubbles[i].style.visibility = "hidden";
        }, Math.random()*1000);
    }
}

function closepopup() {
    document.getElementsByClassName("overlay")[0].style.display = "none";
}

//drag and drop decoration:

// interact('.bauble')
//   .draggable({
//     onmove: function(event) {
//       const target = event.target;

//       const dataX = target.getAttribute('data-x');
//       const dataY = target.getAttribute('data-y');
//       const initialX = parseFloat(dataX) || 0;
//       const initialY = parseFloat(dataY) || 0;

//       const deltaX = event.dx;
//       const deltaY = event.dy;

//       const newX = initialX + deltaX;
//       const newY = initialY + deltaY;

//       target
//         .style
//         .transform = `translate(${newX}px, ${newY}px)`;

//       target.setAttribute('data-x', newX);
//       target.setAttribute('data-y', newY);
//     }
//   })

//   interact('.dropzone')
//   .dropzone({
//     accept: '.bauble',
//     overlap: 0.75,
//     ondropactivate: function (event) {
//       const item = event.relatedTarget
//       item.classList.add('dragging')
//     },
//     ondropdeactivate: function (event) {
//       const item = event.relatedTarget
//       item.classList.remove('dragging', 'cannot-drop')
//     },
//     ondragenter: function(event) {
//       const item = event.relatedTarget
//       item.classList.remove('cannot-drop')
//       item.classList.add('can-drop')
//     },
//     ondragleave: function(event) {
//       const item = event.relatedTarget
//       item.classList.remove('can-drop')
//       item.classList.add('cannot-drop')
//     },
    
//   })
