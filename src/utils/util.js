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
    backgroundImg: 'http://imagedev.fosunholiday.com/member/qr/15573940966868206598805511159157.png',
    iconurl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/QUHanDV7bcMqfu2cibrN6zs9NhxD2Aw5TGib1KCOI9ibqiafXUkPhXmduAfVe8zJKKT6rfC2bbTg5G1amKEvicwnEUw/132',
    code: 'http://imagedev.fosunholiday.com/member/qr/15573940966868206598805511159157.png',
    nameCh: "任我行",
}) {
    let image;
    const canvas = this.refCanvas.current
    // const box = this.refBox.current
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

            ctx.fillStyle = "#fff";
            ctx.font = '14px Adobe Ming Std';
            ctx.fillText(obj.nameCh, 100, 125);

            ctx.fillStyle = "#c5c0b7";
            ctx.font = '14px Adobe Ming Std';
            ctx.fillText('邀请您一起赚奖励金', 100, 150);

            image = new Image();
            image.src = canvas.toDataURL("image/png");
            // box.appendChild(image)
            return image
        })
        return result
    }
}