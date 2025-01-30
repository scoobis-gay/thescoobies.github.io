let canvas = document.getElementById("rlcanvas");
let ctx = canvas.getContext("2d");
ctx.lineWidth = 1;
let mousedown = false;
let touchdown = false;

function draw(x, y) {
    ctx.lineTo(x, y);
    ctx.stroke();
}

canvas.addEventListener('mousedown', event => {
    mousedown = true;
});

canvas.addEventListener('mouseup', event => {
    mousedown = false;
});

canvas.addEventListener('touchstart', event => {
    touchdown = true;
});

canvas.addEventListener('touchend', event => {
    touchdown = false;
});

canvas.addEventListener('mousemove', event => {
    const bb = canvas.getBoundingClientRect();
    const x = Math.floor( (event.offsetX) / bb.width * canvas.width );
    const y = Math.floor( (event.offsetY) / bb.height * canvas.height );
    
    if (mousedown) {
        draw(x, y);
    }
});

let oldx = 0;
let oldy = 0;

canvas.addEventListener('touchmove', event => {
    event.preventDefault();

    const bb = canvas.getBoundingClientRect();
    let  x = Math.floor( (event.changedTouches[0].clientX) / bb.width * canvas.width ) - oldx;
    let  y = Math.floor( (event.changedTouches[0].clientY) / bb.height * canvas.height ) - oldy;
    oldx = x;
    oldy = y;
    
    if (touchdown) {
        draw(x, y);
    }
});

let color_buttons = document.getElementsByClassName("color_button");

for (let i = 0; i < (color_buttons.length); i++) {
    color_buttons.item(i).addEventListener("click", event => {
        ctx.strokeStyle = color_buttons.item(i).getAttribute("drawcolor");
        ctx.fillStyle = color_buttons.item(i).getAttribute("drawcolor");
    });
}