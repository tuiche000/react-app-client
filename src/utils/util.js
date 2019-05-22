export function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] === variable) { return pair[1]; }
    }
    return (false);
}

export function fnCanvas(obj = {
    backgroundImg: '',
    iconurl: '',
    code: '',
    nameCh: "",
}) {
    let image;
    const canvas = this.refCanvas.current
    canvas.width = 320
    canvas.height = 568

    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");
        let imgone = new Image();
        imgone.setAttribute('crossOrigin', 'anonymous');
        imgone.src = obj.backgroundImg

        let imgtwo = new Image();
        imgtwo.setAttribute('crossOrigin', 'anonymous');
        imgtwo.src = obj.iconurl;

        let imgthere = new Image();
        imgthere.setAttribute('crossOrigin', 'anonymous');
        imgthere.src = obj.code;

        function imgLoad(img) {
            return new Promise((resolve, reject) => {
                function next(index) {
                    let timer = `timer${index}`
                    timer = setInterval(function () {
                        if (img[index].complete) {
                            clearInterval(timer)
                            if (index + 1 === img.length) {
                                resolve()
                            } else {
                                next(index + 1)
                            }
                        }
                    }, 50)
                }
                next(0)
            })
        }

        let result = imgLoad([imgone, imgtwo, imgthere]).then(res => {
            ctx.drawImage(imgone, 0, 0, 320, 568);
            ctx.drawImage(imgtwo, 20, 110, 45, 45);
            ctx.drawImage(imgthere, 110, 335, 120, 120);

            ctx.fillStyle = "#fff";
            ctx.font = '14px Adobe Ming Std';
            ctx.fillText(obj.nameCh, 90, 125);


            ctx.fillStyle = "#c5c0b7";
            ctx.font = '14px Adobe Ming Std';
            ctx.fillText('邀请您一起赚奖励金', 90, 150);


            image = new Image();
            image.src = canvas.toDataURL("image/png");
            return image
        })
        return result
    }
}

export function startProductCanvas(obj = {
    productImg: '',
    iconurl: '',
    code: '',
    productSubTittle: "",
    productPrice: null,
    nameCh: "",
    firstOrder: "",
    Official: "",
    welfareIcon: null,
}) {
    let image;
    const canvas = this.refCanvas.current
    canvas.width = 320
    canvas.height = 568
    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");

        let imgone = new Image();
        imgone.setAttribute('crossOrigin', 'anonymous');
        imgone.src = obj.productImg;

        let imgtwo = new Image();
        imgtwo.setAttribute('crossOrigin', 'anonymous');
        imgtwo.src = obj.iconurl;

        let imgthere = new Image();
        imgthere.setAttribute('crossOrigin', 'anonymous');
        imgthere.src = obj.code;

        let imgfour = new Image();
        imgfour.setAttribute('crossOrigin', 'anonymous');
        imgfour.src = obj.welfareIcon;

        function imgLoad(img) {
            return new Promise((resolve, reject) => {
                function next(index) {
                    let timer = `timer${index}`
                    timer = setInterval(function () {
                        if (img[index].complete) {
                            clearInterval(timer)
                            if (index + 1 === img.length) {
                                resolve()
                            } else {
                                next(index + 1)
                            }
                        }
                    }, 50)
                }
                next(0)
            })
        }

        let result = imgLoad([imgone, imgtwo, imgthere]).then(res => {

            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, 320, 568);

            ctx.drawImage(imgone, 0, 0, 320, 320);
            ctx.drawImage(imgtwo, 135, 295, 45, 45);
            ctx.drawImage(imgthere, 220, 450, 100, 100);
            

            ctx.fillStyle = "#666";
            ctx.font = '12px Adobe Ming Std';
            ctx.fillText(obj.Official, 10, 360);

            ctx.fillStyle = '#000'; // 文字填充颜色
            ctx.font = '14px Adobe Ming Std';
            ctx.lineWidth = 1;
            let str = obj.productSubTittle
            if (str.length > 40) {
                str = str.substring(0, 40) + "..."
            }
            let lineWidth = 0;
            let canvasWidth = this.refCanvas.current.width - 20; //计算canvas的宽度
            let initHeight = 385; //绘制字体距离canvas顶部初始的高度
            let lastSubStrIndex = 0; //每次开始截取的字符串的索引
            for (let i = 0; i < str.length; i++) {
                lineWidth += ctx.measureText(str[i]).width;
                if (lineWidth > canvasWidth) {
                    ctx.fillText(str.substring(lastSubStrIndex, i), 10, initHeight); //绘制截取部分
                    initHeight += 18; //40为字体的高度
                    lineWidth = 10;
                    lastSubStrIndex = i;
                }
                if (i === str.length - 1) { //绘制剩余部分
                    ctx.fillText(str.substring(lastSubStrIndex, i + 1), 10, initHeight);
                }
            }

            ctx.fillStyle = '#f5a623';
            ctx.font = '12px Adobe Ming Std';
            ctx.fillText('￥', 10, 430);

            ctx.fillStyle = '#f5a623';
            ctx.font = '20px Adobe Ming Std';
            ctx.fillText(obj.productPrice, 22, 430);

            ctx.fillStyle = '#666';
            ctx.font = '14px Adobe Ming Std';
            ctx.fillText('起', 30 + obj.productPrice.toString().length * 11, 430);

            ctx.fillStyle = '#666';
            ctx.font = '14px Adobe Ming Std';
            ctx.fillText(obj.firstOrder, 50 + obj.productPrice.toString().length * 11, 430);

            ctx.drawImage(imgfour, 167 + obj.productPrice.toString().length * 11, 413, 16, 14);

            ctx.strokeStyle = "transparent";
            ctx.moveTo(200, 480);
            ctx.lineTo(200, 500);
            ctx.stroke();
            ctx.textAlign = "end"

            ctx.fillStyle = '#000';
            ctx.font = '14px Adobe Ming Std';
            ctx.fillText(obj.nameCh, 220, 490);

            ctx.fillStyle = '#000';
            ctx.font = '14px Adobe Ming Std';
            ctx.fillText('邀请您识别二维码 享优惠', 220, 520);


            image = new Image();
            image.src = canvas.toDataURL("image/png");
            // box.appendChild(image)
            return image
        })
        return result
    }
}