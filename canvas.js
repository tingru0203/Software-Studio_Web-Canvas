let down, fill;
let step = -1;
let history = [];
let last_shape;
let last_mouseX, last_mouseY;
let mouseX, mouseY;
let textX, textY;
var hue = 0;

/* pen: 1, eraser: 2, text: 3, 
    rectangle:4, triangle: 5, circle: 6,
    rainbow pen: 7, line: 8, hexagon: 9, paint canvas:10 */
let id = ["pen", "eraser", "text", "rectangle", "rectangle-fill",
        "triangle", "triangle-fill", "circle", "circle-fill", 
        "rainbow", "line", "dash-line", "hexagon", "hexagon-fill", "paint"];
let myfunc = 0;

/* init */
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.lineWidth = 5;
context.strokeStyle = "black";
context.lineJoin = 'round';
context.lineCap = 'round';

/* mouse event */
function mousedown(event) {
    if (step == -1)
        save();

    switch(myfunc) {
        case 1: //pen
        case 2: //eraser
        case 7: //rainbow
            [last_mouseX, last_mouseY] = [mouseX, mouseY];
            [mouseX, mouseY] = [event.offsetX, event.offsetY];
            down = true;
            break;
        case 3: //text
            var left = document.getElementById('left');
            var textarea = document.getElementById('textarea');
            if(textarea == null) { // create textarea
                // record text's position
                textX = event.offsetX;
                textY = event.offsetY;

                var textarea = document.createElement('textarea');
                textarea.id = "textarea";
                textarea.cols = "10";
                textarea.rows = "1";
                textarea.style.position = "fixed";
                textarea.style.left = event.clientX + "px";
                textarea.style.top = event.clientY + "px";
                left.appendChild(textarea);
            }
            else { // write on canvas
                // take font's value
                var style = document.getElementById("font-style").value;
                var size = document.getElementById("font-size").value;
                context.font = size + "px " + style;

                var textValue = textarea.value;
                left.removeChild(textarea);
                context.fillText(textValue, textX, textY+size/2);    
            } 
            break;
        case 4: //rectangle
        case 5: //triangle
        case 6: //circle
        case 8: //line
        case 9: //hexagon
            [last_mouseX, last_mouseY] = [mouseX, mouseY];
            [mouseX, mouseY] = [event.offsetX, event.offsetY];
            down = true;

            last_shape = canvas.toDataURL();
            break;
        case 10: //change canvas color
            canvas.style.background = context.strokeStyle;
            break;
    }
}

function mousemove(event) {
    switch(myfunc) {
        case 1: //pen
        case 2: //eraser
            [last_mouseX, last_mouseY] = [mouseX, mouseY];
            [mouseX, mouseY] = [event.offsetX, event.offsetY];

            if(down) {
                context.beginPath();
                context.moveTo(last_mouseX, last_mouseY);
                context.lineTo(mouseX, mouseY);
                context.stroke();
            }
            break;
        case 4: //rectangle
            [mouseX, mouseY] = [event.offsetX, event.offsetY];

            if(down) {
                let canvaspic = new Image();
                canvaspic.src = last_shape;
                canvaspic.onload = function() {
                    // undo
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(canvaspic, 0, 0);
                    // draw
                    if(fill)
                        context.fillRect(last_mouseX, last_mouseY, mouseX-last_mouseX, mouseY-last_mouseY);
                    else {
                        context.beginPath();
                        context.rect(last_mouseX, last_mouseY, mouseX-last_mouseX, mouseY-last_mouseY);
                        context.stroke();
                    }
                }
            }
            break;
        case 5: //triangle
            [mouseX, mouseY] = [event.offsetX, event.offsetY];

            if(down) {
                let canvaspic = new Image();
                canvaspic.src = last_shape;
                canvaspic.onload = function() {
                    // undo
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(canvaspic, 0, 0);
                    // draw
                    context.beginPath();
                    context.moveTo(last_mouseX, last_mouseY);
                    context.lineTo(mouseX, last_mouseY);
                    context.lineTo((last_mouseX + mouseX)/2, mouseY);
                    context.lineTo(last_mouseX, last_mouseY);
                    if(fill) context.fill();
                    else context.stroke();
                }
            }
            break;
        case 6: //circle
            [mouseX, mouseY] = [event.offsetX, event.offsetY];

            if(down) {
                let canvaspic = new Image();
                canvaspic.src = last_shape;
                canvaspic.onload = function() {
                    // undo
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(canvaspic, 0, 0);
                    // draw
                    context.beginPath();
                    var dis = Math.sqrt((mouseX-last_mouseX)*(mouseX-last_mouseX)+(mouseY-last_mouseY)*(mouseY-last_mouseY));
                    context.arc(last_mouseX, last_mouseY, dis, 0, 2 * Math.PI);
                    if(fill) context.fill();
                    else context.stroke();
                }
            }
            break;
        case 7: //rainbow
            [last_mouseX, last_mouseY] = [mouseX, mouseY];
            [mouseX, mouseY] = [event.offsetX, event.offsetY];

            if(down) {
                context.strokeStyle = `hsl(${hue},100%,50%)`;
                context.beginPath();
                context.moveTo(last_mouseX, last_mouseY);
                context.lineTo(event.offsetX, event.offsetY);
                context.stroke();
                if(hue <= 360) hue++;
                else hue = 0;
            }     
            break;
        case 8: //line
            [mouseX, mouseY] = [event.offsetX, event.offsetY];

            if(down) {
                let canvaspic = new Image();
                canvaspic.src = last_shape;
                canvaspic.onload = function() {
                    // undo
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(canvaspic, 0, 0);
                    // draw
                    context.beginPath();
                    context.moveTo(last_mouseX, last_mouseY);
                    context.lineTo(mouseX, mouseY);
                    context.stroke();
                }
            }
            break;
        case 9: //hexagon
            [mouseX, mouseY] = [event.offsetX, event.offsetY];

            if(down) {
                let canvaspic = new Image();
                canvaspic.src = last_shape;
                canvaspic.onload = function() {
                    // undo
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(canvaspic, 0, 0);
                    // draw
                    var S = (mouseY-last_mouseY)/4; // length*(1/2)
                    var L = S*Math.sqrt(3); // length*(sqrt(3)/2)
                    context.beginPath();
                    context.moveTo(last_mouseX, last_mouseY);
                    context.lineTo(last_mouseX+L, last_mouseY+S);
                    context.lineTo(last_mouseX+L, mouseY-S);
                    context.lineTo(last_mouseX, mouseY);
                    context.lineTo(last_mouseX-L, mouseY-S);
                    context.lineTo(last_mouseX-L, last_mouseY+S);
                    context.lineTo(last_mouseX, last_mouseY);
                    if(fill) context.fill();
                    else context.stroke();
                }
            }
            break;
    }
}

function mouseup() {
    save();
    down = false;
}

/* select function */
function pen() {
    penColor();
    canvas.style.cursor = "url(./image/pencil.svg) 0 16, auto";
    myfunc = 1;
    func_change("pen");
}

function eraser() {
    canvas.style.cursor = "url(./image/eraser.svg) 0 16, auto";
    myfunc = 2;
    func_change("eraser");
}

function text() {
    canvas.style.cursor = "text";
    myfunc = 3;
    func_change("text");
}

function rectangle(f) {
    penColor();
    myfunc = 4;
    if(f) {
        fill = 1;
        func_change("rectangle-fill");
        canvas.style.cursor = "url(./image/rectangle-fill.svg) 0 16, auto";
    }
    else {
        fill = 0;
        func_change("rectangle");
        canvas.style.cursor = "url(./image/rectangle.svg) 0 16, auto";
    }
} 

function triangle(f) {
    penColor();
    myfunc = 5;
    if(f) {
        fill = 1;
        func_change("triangle-fill");
        canvas.style.cursor = "url(./image/triangle-fill.svg) 0 16, auto";
    }
    else {
        fill = 0;
        func_change("triangle");
        canvas.style.cursor = "url(./image/triangle.svg) 0 16, auto";
    }
}

function circle(f) {
    penColor();
    myfunc = 6;
    if(f) {
        fill = 1;
        func_change("circle-fill");
        canvas.style.cursor = "url(./image/circle-fill.svg) 0 16, auto";
    }
    else {
        fill = 0;
        func_change("circle");
        canvas.style.cursor = "url(./image/circle.svg) 0 16, auto";
    }
}

function rainbow() {
    canvas.style.cursor = "url(./image/rainbow.svg) 0 8, auto";
    myfunc = 7;
    func_change("rainbow");
}

function line(s) {
    penColor();
    myfunc = 8;
    if(s) { // line
        canvas.style.cursor = "url(./image/line.svg) 0 16, auto";
        func_change("line");
    }
    else { //dash line
        canvas.style.cursor = "url(./image/dash-line.svg) 0 16, auto";
        func_change("dash-line");
    }
}

function hexagon(f) {
    penColor();
    myfunc = 9;
    if(f) {
        fill = 1;
        func_change("hexagon-fill");
        canvas.style.cursor = "url(./image/hexagon-fill.svg) 0 16, auto";
    }
    else {
        fill = 0;
        func_change("hexagon");
        canvas.style.cursor = "url(./image/hexagon.svg) 0 16, auto";
    }
}

function paint() {
    canvas.style.cursor = "url(./image/canvas.svg) 0 16, auto";
    penColor();
    myfunc = 10;
    func_change("paint");
}

function Size() {
    var slider = document.getElementById("myRange");
    context.lineWidth = slider.value/10;
}

function penColor() {
    var color = document.getElementById("myColor");
    context.strokeStyle = color.value;
    context.fillStyle = color.value;
}

function save() {
    step++;
    if (step < history.length) 
        history.length = step;
    history.push(canvas.toDataURL());
}

function undo() {
    if (step > 0) {
        step--; //last step
        let canvaspic = new Image();
        canvaspic.src = history[step];
        canvaspic.onload = function() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(canvaspic, 0, 0);
        }
    }
}

function redo() {
    if (step < history.length - 1) {
        step++; //next step
        const canvaspic = new Image(); 
        canvaspic.src = history[step]; 
        canvaspic.onload = function() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(canvaspic, 0, 0);
        }
    }
}

function Download() {
    var DL = document.createElement('a');
    DL.href = canvas.toDataURL('image/png');;
    DL.download = "img.png"; //image's name
    DL.click();
}

function Upload(th) {
    var img = new Image();
    var file = th.files[0];
    var src = URL.createObjectURL(file);
    
    img.src = src;
    img.onload = function () {
        context.drawImage(img, 0, 0);
        URL.revokeObjectURL(src);

        save();
    }
}

function Clean() {
    step = -1;
    history = [];
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function func_change(changeId) {
    for (i = 0; i < id.length; i++) {
        var func = document.getElementById(id[i]);
        if(changeId == "eraser")
            context.globalCompositeOperation = "destination-out";
        else
            context.globalCompositeOperation = "source-over";

        if(changeId == "dash-line")
            context.setLineDash([10, 10]);
        else
            context.setLineDash([]);

        // button change
        if (id[i] == changeId){ //select
            func.style.border = "black 3px solid";
            func.style.background = "rgb(185, 185, 185)";
            func.style.color = "rgb(54, 54, 54)";
        }
        else{ //origin
            func.style.border = "none";
            func.style.background = "#757575";
            func.style.color = "white";
        }
    }
}

/* listen event */
canvas.addEventListener('mousemove', mousemove);
canvas.addEventListener('mousedown', mousedown);
canvas.addEventListener('mouseup', mouseup);

