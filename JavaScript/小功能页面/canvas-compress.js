//# 图片压缩
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}
function canvasPress(file, cb, type = "image/jpeg", wLimit = 2000) {
    var img = new Image();
    img.src = window.URL.createObjectURL(file);
    var imgWidth, imgHeight;
    img.onload = function () {
        imgWidth = img.width;
        imgHeight = img.height;
        let ctxW, ctxH;
        if (imgWidth > imgHeight && imgWidth > wLimit) {
            ctxW = wLimit;
            ctxH = wLimit * imgHeight / imgWidth
        } else if (imgHeight > imgWidth && imgHeight > wLimit) {
            ctxH = wLimit;
            ctxW = wLimit * imgWidth / imgHeight
        } else {
            ctxW = imgWidth
            ctxH = imgHeight
        }
        var canvas = document.createElement("canvas");
        canvas.width = ctxW
        canvas.height = ctxH
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, ctxW, ctxH);
        ctx.drawImage(img, 0, 0, ctxW, ctxH);
        let base64 = canvas.toDataURL(type, .5);
        cb(dataURLtoBlob(base64))
    }
}