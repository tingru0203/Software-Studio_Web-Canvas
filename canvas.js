let canvas, context;
let down, p, era, rec, tex, rain;
let step = -1;
let history = [];
let last_mouseX, last_mouseY;
let mouseX, mouseY;
let textX, textY;
var hue = 0;
let last_shape;

function init() {
    console.log("init");
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    context.lineWidth = 5;
    context.strokeStyle = "black";
}

function start(event) {
    if (step == -1)
        save();
    if(tex) {
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
    }
    else {
        last_mouseX = event.offsetX;
        last_mouseY = event.offsetY;
        context.moveTo(event.offsetX, event.offsetY);
        down = true;
        context.beginPath();
    }
}

function draw(event) {
    if(down) {
        if(era) {
            context.clearRect(event.offsetX, event.offsetY, context.lineWidth, context.lineWidth);
        }
        else if(rec) {
            //save();
            last_shape = canvas.toDataURL();

            mouseX = event.offsetX;
            mouseY = event.offsetY;
            var width = mouseX-last_mouseX;
            var height = mouseY-last_mouseY;
            context.rect(last_mouseX, last_mouseY, width, height);
            context.stroke();
            //undo();
            let canvaspic = new Image(); //建立新的 Image
            canvaspic.src = last_shape; //載入剛剛存放的影像
            /*canvaspic.onload = function() {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(canvaspic, 0, 0) //匯出影像並從座標 x:0 y:0 開始
            }*/

            context.clearRect(last_mouseX, last_mouseY, width, height);
        }
        else if(p) { 
            context.lineTo(event.offsetX, event.offsetY);
            context.stroke();
        }
        else if(rain) {
            console.log(hue);
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
    } 
}

function end() {
    down = false;
    context.closePath();
    save();
}

/* select function */
function pen() {
    canvas.style.cursor = "url(./image/pencil.svg) 0 16, auto";
    p = true;
    era = false;
    rec = false;
    tex = false;
}

function rainbow() {
    canvas.style.cursor = "url(./image/rainbow.svg) 0 8, auto";
    p = false;
    era = false;
    rec = false;
    tex = false;
    rain = true;
}

function eraser() {
    canvas.style.cursor = "url(./image/eraser.svg) 0 16, auto";
    p = false;
    era = true;
    rec = false;
    tex = false;
}

function text() {
    canvas.style.cursor = "text";
    p = false;
    era = false;
    rec = false;
    tex = true;
}

function rectangle() {
    p = false;
    era = false;
    rec = true;
    tex = false;
} 

function circle() {

}

function triangle() {

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
    if (step < history.length - 1) 
        history.length = step + 1;
    history.push(canvas.toDataURL()); //當前影像存成 Base64 編碼的字串並放入陣列
    console.log("save");
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
