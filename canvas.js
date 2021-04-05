let down;
let step = -1;
let history = [];
let last_mouseX, last_mouseY;
let mouseX, mouseY;
let textX, textY;
var hue = 0;
let last_shape;
let fill;

/* pen: 1, eraser: 2, text: 3, 
    rectangle:4, triangle: 5, circle: 6,
    rainbow pen: 7, line:8 */
let id = ["pen", "eraser", "text", "rectangle", 
        "triangle", "circle", "rainbow", "line"];
let myfunc = 0;

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.lineWidth = 5;
context.strokeStyle = "black";
context.lineJoin = 'round';
context.lineCap = 'round';

function mousedown(event) {
    if (step == -1)
        save();

    switch(myfunc) {
        case 1: //pen
            last_mouseX = mouseX;
            last_mouseY = mouseY;
            mouseX = event.offsetX;
            mouseY = event.offsetY;
            down = true;
            break;
        case 2: //eraser
            last_mouseX = mouseX;
            last_mouseY = mouseY;
            mouseX = event.offsetX;
            mouseY = event.offsetY;
            down = true;
            break;
        case 3: //text
            var left = document.getElementById('left');
            var textarea = document.getElementById('textarea');
            if(textarea != null) {
                var style = document.getElementById("font-style").value;
                var size = document.getElementById("font-size").value;
                context.font = size + "px " + style;
                textValue = textarea.value;
                left.removeChild(textarea);

                console.log(textX, textY);
                context.fillText(textValue, textX, textY+size/2);    
            }
            else {
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
            break;
        case 4: //rectangle
            last_mouseX = mouseX;
            last_mouseY = mouseY;
            mouseX = event.offsetX;
            mouseY = event.offsetY;
            down = true;

            last_shape = canvas.toDataURL();
            break;
        case 5: //triangle
            last_mouseX = mouseX;
            last_mouseY = mouseY;
            mouseX = event.offsetX;
            mouseY = event.offsetY;
            down = true;

            last_shape = canvas.toDataURL();
            break;
        case 6: //circle
            last_mouseX = mouseX;
            last_mouseY = mouseY;
            mouseX = event.offsetX;
            mouseY = event.offsetY;
            down = true;

            last_shape = canvas.toDataURL();
            break;
        case 7: //rainbow
            last_mouseX = mouseX;
            last_mouseY = mouseY;
            mouseX = event.offsetX;
            mouseY = event.offsetY;
            down = true;
            break;
        case 8: //line
            last_mouseX = mouseX;
            last_mouseY = mouseY;
            mouseX = event.offsetX;
            mouseY = event.offsetY;
            down = true;

            last_shape = canvas.toDataURL();
            break;

    }
}

function mousemove(event) {
    switch(myfunc) {
        case 1: //pen
            last_mouseX = mouseX;
            last_mouseY = mouseY;
            mouseX = event.offsetX;
            mouseY = event.offsetY;
            if(down) {
                context.beginPath();
                context.moveTo(last_mouseX, last_mouseY);
                context.lineTo(mouseX, mouseY);
                context.stroke();
            }
            break;
        case 2: //eraser
            if(down)
                context.clearRect(event.offsetX, event.offsetY, context.lineWidth, context.lineWidth);
            break;
        case 3: //text
            break;
        case 4: //rectangle
            mouseX = event.offsetX;
            mouseY = event.offsetY;

            if(down) {
                let canvaspic = new Image(); //建立新的 Image
                canvaspic.src = last_shape; //載入剛剛存放的影像
                canvaspic.onload = function() {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(canvaspic, 0, 0) //匯出影像並從座標 x:0 y:0 開始
            
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
            mouseX = event.offsetX;
            mouseY = event.offsetY;

            if(down) {
                let canvaspic = new Image(); //建立新的 Image
                canvaspic.src = last_shape; //載入剛剛存放的影像
                canvaspic.onload = function() {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(canvaspic, 0, 0) //匯出影像並從座標 x:0 y:0 開始

                    context.beginPath();
                    context.moveTo(last_mouseX, last_mouseY);
                    context.lineTo(mouseX, last_mouseY);
                    context.lineTo((last_mouseX + mouseX)/2, mouseY);
                    context.lineTo(last_mouseX, last_mouseY);
                    if(fill)
                        context.fill();
                    else
                        context.stroke();
                }
            }
            break;
        case 6: //circle
            mouseX = event.offsetX;
            mouseY = event.offsetY;

            if(down) {
                let canvaspic = new Image(); //建立新的 Image
                canvaspic.src = last_shape; //載入剛剛存放的影像
                canvaspic.onload = function() {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(canvaspic, 0, 0) //匯出影像並從座標 x:0 y:0 開始

                    context.beginPath();
                    var dis = Math.sqrt((mouseX-last_mouseX)*(mouseX-last_mouseX)+(mouseY-last_mouseY)*(mouseY-last_mouseY));
                    context.arc(last_mouseX, last_mouseY, dis, 0, 2 * Math.PI);
                    if(fill)
                        context.fill();
                    else
                        context.stroke();
                }
            }
            break;
        case 7: //rainbow
            if(down) {
                context.strokeStyle = `hsl(${hue},100%,50%)`;
                context.beginPath();
                context.moveTo(last_mouseX, last_mouseY);
                context.lineTo(event.offsetX, event.offsetY);
                context.stroke();
                [last_mouseX, last_mouseY] = [event.offsetX, event.offsetY];
                context.closePath();
                if(hue <= 360)
                    hue++;
                else
                    hue = 0;
            }     
            break;
        case 8: //line
            mouseX = event.offsetX;
            mouseY = event.offsetY;

            if(down) {
                let canvaspic = new Image(); //建立新的 Image
                canvaspic.src = last_shape; //載入剛剛存放的影像
                canvaspic.onload = function() {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(canvaspic, 0, 0) //匯出影像並從座標 x:0 y:0 開始

                    context.beginPath();
                    context.moveTo(last_mouseX, last_mouseY);
                    context.lineTo(mouseX, mouseY);
                    context.stroke();
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

function line() {
    canvas.style.cursor = "url(./image/line.svg) 0 16, auto";
    myfunc = 8;
    func_change("line");
}

function Size() {
    var slider = document.getElementById("myRange");
    context.lineWidth = slider.value/10;
}

function penColor() {
    var color = document.getElementById("myColor");
    context.strokeStyle = color.value;
}

function save() {
    step++;
    if (step < history.length) 
        history.length = step;
    history.push(canvas.toDataURL()); //當前影像存成 Base64 編碼的字串並放入陣列
    console.log("save "+step);
}

function undo() {
    if (step > 0) {
        step--;
        let canvaspic = new Image(); //建立新的 Image
        canvaspic.src = history[step]; //載入剛剛存放的影像
        canvaspic.onload = function() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(canvaspic, 0, 0) //匯出影像並從座標 x:0 y:0 開始
        }
    }
    //最後這邊是讓上一步下一步可以在不能使用時顯示灰色及更改鼠標，可以不加
    /*if (step < history.length && step > 0) {
        $('next-step').removeClass('disable-btn');
    }*/
}

function redo() {
    if (step < history.length - 1) {
        step++;
        const canvaspic = new Image(); //建立新的 Image
        canvaspic.src = history[step]; //載入剛剛存放的影像
        canvaspic.onload = function() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(canvaspic, 0, 0) //匯出影像並從座標 x:0 y:0 開始
        }
        /*if (step === history.length - 1) {
            $('.next-step').addClass('disable-btn');
        }*/
    }
}

function Download() {
    var DL = document.createElement('a');
    DL.href = canvas.toDataURL('image/png');;
    DL.download = "img.png";
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
    }
}

function Clean() {
    step = -1;
    history = [];
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function func_change(changeId) {
    for (i = 0; i < id.length; i++){
        if (id[i] == changeId){
            document.getElementById(id[i]).style['border'] = "blue 3px solid";
        }
        else{
            document.getElementById(id[i]).style['border'] = "none";
        }
    }
}

canvas.addEventListener('mousemove', function (event) {
    mousemove(event)
}, false);
canvas.addEventListener('mousedown', function (event) {
    mousedown(event)
}, false);
canvas.addEventListener('mouseup', function (event) {
    mouseup(event)
}, false);

