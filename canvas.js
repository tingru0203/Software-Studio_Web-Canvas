let down, p, era, rec, tex, rain;
let step = -1;
let history = [];
let last_mouseX, last_mouseY;
let mouseX, mouseY;
let textX, textY;
var hue = 0;
let last_shape;

/* pen: 1, eraser: 2, text: 3, 
    rectangle:4, triangle: 5, circle: 6,
    rainbow pen: 7 */
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

                    context.beginPath();
                    context.rect(last_mouseX, last_mouseY, mouseX-last_mouseX, mouseY-last_mouseY);
                    context.stroke();
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
                    context.stroke();
                }
            }
            break;
        case 7: //rainbow
            if(down) {
                context.strokeStyle = `hsl(${hue},100%,50%)`
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
    }
}

function mouseup() {
    save();
    down = false;

    //context.closePath();
}

/* select function */
function pen() {
    canvas.style.cursor = "url(./image/pencil.svg) 0 16, auto";
    myfunc = 1;
}

function eraser() {
    canvas.style.cursor = "url(./image/eraser.svg) 0 16, auto";
    myfunc = 2;
}

function text() {
    canvas.style.cursor = "text";
    myfunc = 3;
}

function rectangle() {
    canvas.style.cursor = "url(./image/rectangle.svg) 0 16, auto";
    myfunc = 4;
} 

function triangle() {
    canvas.style.cursor = "url(./image/triangle.svg) 0 16, auto";
    myfunc = 5;
}

function circle() {
    canvas.style.cursor = "url(./image/circle.svg) 0 16, auto";
    myfunc = 6;
}

function rainbow() {
    canvas.style.cursor = "url(./image/rainbow.svg) 0 8, auto";
    myfunc = 7;
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
    /*if (step < userhistory.length && step > 0) {
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

function Download(th) {
    const dataURL = canvas.toDataURL('image/png'); //把影像轉成指定格式的 URL 字串    
    th.href = dataURL;
}

function Upload(th) {
    var img = new Image();
    
    img.onload = function () {
        context.drawImage(img, 0, 0);
        URL.revokeObjectURL(src);
    }
    
    var file = th.files[0];
    var src = URL.createObjectURL(file);
    
    img.src = src;
}

function Clean() {
    step = -1;
    history = [];
    context.clearRect(0, 0, canvas.width, canvas.height);
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

