function  Label(text,option) {

    if ( option === undefined ) option = {};

    this.fontface = option.hasOwnProperty("fontface") ?
        option["fontface"] : "Arial";

    /* 字体大小 */
    this.fontsize = option.hasOwnProperty("fontsize") ?
        option["fontsize"] : 18;

    this.fontColor=option.hasOwnProperty("fontColor") ?
        option["fontColor"] : "#FFFFFF";
    /* 背景颜色 */
    this.backgroundColor = option.hasOwnProperty("backgroundColor") ?
        option["backgroundColor"] : 'rgba(8, 36, 85, 0.8)';;

    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');

    context.font = "Bold " + this.fontsize + "px " + this.fontface;

    /* 获取文字的大小数据，高度取决于文字的大小 */
    var metrics = context.measureText( text );
    var textWidth = metrics.width;
    // 定义画布的宽度
    canvas.width = (textWidth+textWidth*0.4);
    // 定义画布的高度
    canvas.height = (this.fontsize*2);
    // 定义canvas画笔的x坐标点
    let x = 0;
    // 定义canvas画笔的y坐标点
    let y = 0;
    // 定义圆角的半径
    let r = 15;
    // 提示框的宽度
    let w = canvas.width;
    // 提示框的高度======》画布高度-下放三角箭头的高度
    let h = canvas.height-r;
    // 缩放
    context.scale(1, 1);
    // 背景颜色
    context.fillStyle=this.backgroundColor;

    // 开始
    context.beginPath();
    // 画笔移动到起始位置
    context.moveTo(x + r, y);
    // 绘制右上角的圆角
    context.arcTo(x + w, y, x + w, y + h, r);
    // 绘制右下角的圆角
    context.arcTo(x + w, y + h, x, y + h, r);

    // 画三角形轮廓
    // 绘制到三角形起点的位置
    context.lineTo(x + w, y + h);
    // 绘制三角形的起点到顶点的线段
    context.lineTo(x + w / 2 + 10, y + h);
    // 绘制顶点到三角形另一边的线段
    context.lineTo(x + w / 2, y + h+r);
    // 绘制三角形结束点到左下方的圆角起始处
    context.lineTo(x + w / 2 - 10, y + h );

    // 绘制左下角的圆角
    context.arcTo(x, y + h, x, y, r);
    // 绘制左上角的圆角
    context.arcTo(x, y, x + w, y, r);
    // 设置阴影
    context.shadowColor = 'rgba(0, 0, 0, 0.2)'; // 颜色
    context.shadowBlur = 5; // 模糊尺寸
    context.shadowOffsetX = 2; // 阴影Y轴偏移
    context.shadowOffsetY = 2; // 阴影X轴偏移
    // 关闭,形成一个闭合的回路---->轮廓
    context.closePath();
    // 填充
    context.fill();

    context.fillStyle=this.fontColor;
    context.textAlign='center';
    context.textBaseline='middle'
    context.font = "Bold " + this.fontsize + "px " + this.fontface;
    context.fillText( text, (canvas.width-textWidth)/2, (canvas.height)/2);

    /* 画布内容用于纹理贴图 */
    let texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    let spriteMaterial = new THREE.SpriteMaterial({ map: texture } );
    let sprite = new THREE.Sprite( spriteMaterial );

    /* 缩放比例 */
    sprite.scale.set(100,100,1);

    return sprite;
}