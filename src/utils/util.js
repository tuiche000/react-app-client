export function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] === variable) { return pair[1]; }
    }
    return (false);
}

export function fnCanvas (obj = {
    // productImg: 'http://h5test.gofoliday.com/static/img/learnBanner.png',
    // productImg: "http://img.fosunholiday.com/img/M00/00/5E/Ch0djlym8MeAGvG3ABQRRuZtVmI822.jpg",
    backgroundImg: 'http://imagedev.fosunholiday.com/member/qr/15573940966868206598805511159157.png',
    iconurl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/QUHanDV7bcMqfu2cibrN6zs9NhxD2Aw5TGib1KCOI9ibqiafXUkPhXmduAfVe8zJKKT6rfC2bbTg5G1amKEvicwnEUw/132',
    code: 'http://imagedev.fosunholiday.com/member/qr/15573940966868206598805511159157.png',
    nameCh: "任我行",
}) {
    let image;
    const canvas = this.refCanvas.current
    const box = this.refBox.current
    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");
        // (function () {
        //     Object.getPrototypeOf(ctx).Triangle = function (x, y, r) {
        //         this.save();
        //         this.translate(x, y);
        //         this.rotate(r);
        //         this.beginPath();
        //         this.moveTo(0, 0);
        //         this.lineTo(10, 0);
        //         this.lineTo(0, 10);
        //         this.lineTo(-10, 0);
        //         this.closePath();
        //         this.fill();
        //         this.restore();
        //     }
        //     Object.getPrototypeOf(ctx).line = function (x, y, x1, y1) {
        //         this.save();
        //         this.beginPath();
        //         this.moveTo(x, y);
        //         this.lineTo(x1, y1);
        //         this.stroke();
        //         this.restore();
        //     }
        // })();
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
                    console.log(index)
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
            ctx.drawImage(imgthere, 110, 350, 100, 100);
            ctx.fillStyle = "#c5c0b7";
            ctx.font = '14px Adobe Ming Std';
            ctx.fillText('邀请您一起赚奖励金', 100, 150);

            // ctx.strokeStyle = "#7C8B8C";
            // ctx.line(90, 130, 320, 210);
            // ctx.Triangle(320, 210, -Math.PI * .4);

            image = new Image();
            image.src = canvas.toDataURL("image/png");
            // box.appendChild(image)
            return image
        })
        return result
    }
}