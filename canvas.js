let canvas, context;
let click, e, rec;
let step = -1;
let history = [];
let last_mouseX, last_mouseY;
let mouseX, mouseY;
let f = 0;
let last_shape;

function Upload(event) {
    var img = new Image();
    
    img.onload = function () {
        context.drawImage(img, 0, 0);
        URL.revokeObjectURL(src);
    }
    
    var file = event.files[0];
    var src = URL.createObjectURL(file);
    
    img.src = src;
}


function init() {
    console.log("d1");
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
}

function save() {
    step++;
    if (step < history.length - 1) 
        history.length = step + 1;
    history.push(canvas.toDataURL()); //當前影像存成 Base64 編碼的字串並放入陣列
    console.log("save");
}

function start(event) {
    if (step == -1)
        save();
    last_mouseX = event.offsetX;
    last_mouseY = event.offsetY;
    context.moveTo(event.offsetX, event.offsetY);
    click = true;
    context.beginPath();
}

function draw(event) {
    //canvas.cursor = "grab";
    if(click) {
        if(e) {
            context.clearRect(event.offsetX, event.offsetY, context.lineWidth, context.lineWidth);
        }
        else if(rec) {
            
            //if(f != 0)
            //context.clearRect(last_mouseX, last_mouseY, width, height);


            mouseX = event.offsetX;
            mouseY = event.offsetY;
            var width = mouseX-last_mouseX;
            var height = mouseY-last_mouseY;
            context.beginPath();
            context.rect(last_mouseX, last_mouseY, width, height);
            context.stroke();
            
            
        }
        else {
            //console.log("x: "+event.offsetX+"\ny: "+event.offsetY); 
            context.lineTo(event.offsetX, event.offsetY);
            context.stroke();
        }
    }
    
}

function end() {
    click = false;
    context.closePath();
    save();
}

function Size() {
    var slider = document.getElementById("myRange");
    //console.log(slider.value);
    context.lineWidth = slider.value/10;
}

function penColor() {
    var color = document.getElementById("myColor");
    console.log(color.value);
    context.strokeStyle = color.value;
}

async function pen() {
    await init();
    context.lineWidth = 5;
    context.strokeStyle = "#000000";
    e = false;
    rec = false;
    //canvas.cursor = "url(/image/pen.jpg)";

}

async function eraser() {
    e = true;
}

function rectangle() {
    rec = true;
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

function Download() {
    console.log("download");
    const dataURL = canvas.toDataURL('image/png'); //把影像轉成指定格式的 URL 字串
    var Save = document.getElementById("save");    
    Save.href = dataURL;
    console.log(Save.href);
}

function Clean() {
    step = -1;
    history = [];
    context.clearRect(0, 0, canvas.width, canvas.height);
}
