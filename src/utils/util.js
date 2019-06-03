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
    canvas.width = 610
    canvas.height = 830

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

        //第一步 画个圆


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

            ctx.drawImage(imgone, 0, 0, 610, 830);
            ctx.drawImage(imgthere, 220, 500, 160, 160);

            ctx.fillStyle = "#fff";
            ctx.font = '26px Adobe Ming Std';
            ctx.fillText(obj.nameCh, 140, 180);

            ctx.fillText('邀请您一起赚奖励金', 140, 230);

            ctx.beginPath();
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = "8";
            ctx.arc(80, 200, 40, 0, 360 * Math.PI / 180, true);
            ctx.closePath();
            ctx.stroke();
            ctx.clip();
            ctx.drawImage(imgtwo, 40, 160, 80, 80);

            ctx.fillStyle = "#c5c0b7";
            ctx.font = '26px Adobe Ming Std';

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
    canvas.width = 610
    canvas.height = 830

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
            ctx.fillRect(0, 0, 610, 830);

            ctx.drawImage(imgone, 0, 0, 610, 460);

            ctx.drawImage(imgthere, 440, 676, 150, 150);


            ctx.fillStyle = "#666";
            ctx.font = '24px Adobe Ming Std';
            ctx.fillText(obj.Official, 20, 540);

            ctx.fillStyle = '#000'; // 文字填充颜色
            ctx.font = '26px Adobe Ming Std';
            ctx.lineWidth = 1;
            let str = obj.productSubTittle
            // let str = "昂贵代价傻瓜顶顶顶顶顶顶顶顶顶顶顶顶顶按时归还斤斤计较斤斤计较"
            if (str.length > 40) {
                str = str.substring(0, 40) + "..."
            }
            let lineWidth = 0;
            let canvasWidth = this.refCanvas.current.width - 40; //计算canvas的宽度
            let initHeight = 580; //绘制字体距离canvas顶部初始的高度
            let lastSubStrIndex = 0; //每次开始截取的字符串的索引
            for (let i = 0; i < str.length; i++) {
                lineWidth += ctx.measureText(str[i]).width;
                if (lineWidth > canvasWidth) {
                    ctx.fillText(str.substring(lastSubStrIndex, i), 20, initHeight); //绘制截取部分
                    initHeight += 36; //40为字体的高度
                    lineWidth = 20;
                    lastSubStrIndex = i;
                }
                if (i === str.length - 1) { //绘制剩余部分
                    ctx.fillText(str.substring(lastSubStrIndex, i + 1), 20, initHeight);
                }
            }

            ctx.fillStyle = '#f5a623';
            ctx.font = '24px Adobe Ming Std';
            ctx.fillText('￥', 20, 670);

            ctx.fillStyle = '#f5a623';
            ctx.font = '40px Adobe Ming Std';
            ctx.fillText(obj.productPrice, 44, 670);

            ctx.fillStyle = '#666';
            ctx.font = '26px Adobe Ming Std';
            ctx.fillText('起', 60 + obj.productPrice.toString().length * 22, 670);

            ctx.fillStyle = '#666';
            ctx.font = '26px Adobe Ming Std';
            ctx.fillText(obj.firstOrder, 100 + obj.productPrice.toString().length * 22, 670);

            ctx.drawImage(imgfour, 320 + obj.productPrice.toString().length * 22, 640, 24, 20);

            ctx.strokeStyle = "transparent";
            ctx.moveTo(400, 740);
            ctx.lineTo(400, 780);
            ctx.stroke();
            ctx.textAlign = "end"

            ctx.fillStyle = '#000';
            ctx.font = '26px Adobe Ming Std';
            ctx.fillText(obj.nameCh, 440, 740);

            ctx.fillStyle = '#000';
            ctx.font = '26px Adobe Ming Std';
            ctx.fillText('邀请您识别二维码 享优惠', 440, 780);

            ctx.beginPath();
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = "10";
            ctx.arc(304, 460, 40, 0, 360 * Math.PI / 180, true);
            ctx.closePath();
            ctx.stroke();
            ctx.clip();
            ctx.drawImage(imgtwo, 265, 420, 80, 80);

            image = new Image();
            image.src = canvas.toDataURL("image/png");
            // box.appendChild(image)
            return image
        })
        return result
    }
}

export function recommendImgCanvas(obj = {
    backgroundImg: '',
}) {
    let image;
    const canvas = this.refCanvas.current
    canvas.width = 592
    canvas.height = 833

    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");

        let imgone = new Image();
        imgone.setAttribute('crossOrigin', 'anonymous');
        imgone.src = obj.backgroundImg;

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

        let result = imgLoad([imgone]).then(res => {
            ctx.drawImage(imgone, 0, 0, 592, 833);

            ctx.fillStyle = '#7c693c';
            ctx.font = '30px Adobe Ming Std';
            ctx.fillText("分享邀请或推荐链接", 190, 300);

            ctx.fillStyle = '#6a6a6a';
            ctx.font = '23px Adobe Ming Std';
            ctx.fillText("通过微信、微博、钉钉等分享给好友", 190, 335);

            ctx.fillStyle = '#7c693c';
            ctx.font = '30px Adobe Ming Std';
            ctx.fillText("好友注册/下单", 190, 490);

            ctx.fillStyle = '#6a6a6a';
            ctx.font = '23px Adobe Ming Std';
            ctx.fillText("好友注册成为会员或好友首次下单", 190, 525);

            ctx.fillStyle = '#7c693c';
            ctx.font = '30px Adobe Ming Std';
            ctx.fillText("获得积分/奖励金", 190, 690);

            ctx.fillStyle = '#6a6a6a';
            ctx.font = '23px Adobe Ming Std';
            ctx.fillText("好友注册成为会员后，您获得积分奖", 190, 725);

            ctx.fillStyle = '#6a6a6a';
            ctx.font = '23px Adobe Ming Std';
            ctx.fillText("励；好友下单出游后，您获得奖励金", 190, 760);


            image = new Image();
            image.src = canvas.toDataURL("image/png");
            // box.appendChild(image)
            return image
        })
        return result
    }
}

export function lachineImgCanvas(obj = {
    backgroundImg: '',
}) {
    let image;
    const canvas = this.refCanvas.current
    canvas.width = 592
    canvas.height = 833

    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");

        let imgone = new Image();
        imgone.setAttribute('crossOrigin', 'anonymous');
        imgone.src = obj.backgroundImg;

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

        let result = imgLoad([imgone]).then(res => {
            ctx.drawImage(imgone, 0, 0, 592, 726);

            ctx.fillStyle = '#837146';
            ctx.font = '28px Adobe Ming Std';
            ctx.fillText("第1~4人", 60, 310);

            ctx.fillStyle = '#6a6a6a';
            ctx.font = '22px Adobe Ming Std';
            ctx.fillText("每人奖励100积分", 60, 350);


            ctx.fillStyle = '#837146';
            ctx.font = '28px Adobe Ming Std';
            ctx.fillText("第5人", 300, 310);

            ctx.fillStyle = '#6a6a6a';
            ctx.font = '22px Adobe Ming Std';
            ctx.fillText("获取阶段奖励500积分", 300, 350);

            ctx.fillStyle = '#837146';
            ctx.font = '28px Adobe Ming Std';
            ctx.fillText("第6~9人", 60, 410);

            ctx.fillStyle = '#6a6a6a';
            ctx.font = '22px Adobe Ming Std';
            ctx.fillText("每人奖励100积分", 60, 450);

            ctx.fillStyle = '#837146';
            ctx.font = '28px Adobe Ming Std';
            ctx.fillText("第10人", 300, 410);

            ctx.fillStyle = '#6a6a6a';
            ctx.font = '22px Adobe Ming Std';
            ctx.fillText("获取阶段奖励500积分", 300, 450);

            ctx.fillStyle = '#837146';
            ctx.font = '28px Adobe Ming Std';
            ctx.fillText("第11~49人", 60, 510);

            ctx.fillStyle = '#6a6a6a';
            ctx.font = '22px Adobe Ming Std';
            ctx.fillText("每人奖励100积分", 60, 550);

            ctx.fillStyle = '#837146';
            ctx.font = '28px Adobe Ming Std';
            ctx.fillText("第50人", 300, 510);

            ctx.fillStyle = '#6a6a6a';
            ctx.font = '22px Adobe Ming Std';
            ctx.fillText("获取阶段奖励1000积分", 300, 550);

            //开始一个新的绘制路径
            ctx.beginPath();
            // 直线颜色
            ctx.strokeStyle="#d0d0d0"
            //定义直线的起点坐标为(10,10)
            ctx.moveTo(60, 600);
            //定义直线的终点坐标为(50,10)
            ctx.lineTo(550, 600);
            //沿着坐标点顺序的路径绘制直线
            ctx.stroke();
            //关闭当前的绘制路径
            ctx.closePath();

            ctx.fillStyle = '#ff7700';
            ctx.font = '30px Adobe Ming Std';
            ctx.fillText("总获取6800积分", 180, 650);

            image = new Image();
            image.src = canvas.toDataURL("image/png");
            // box.appendChild(image)
            return image
        })
        return result
    }
}