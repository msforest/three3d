
/*
option参数含义
length:长
width:宽
positionX：x轴位置
positionY：y轴位置
color:创建的默认6个面的颜色值
 */
function StoreArea(option)
{

    var LineMat = new THREE.MeshLambertMaterial({color:0xDFCE19,NeedsUpdate: 1});
    this.BorderWidth=8;
    this.PositionY=2.5;
    this.length=option.Length||1;
    this.width=option.Width||1;

    this.positionX=option.Position.X||0;
    this.positionZ=option.Position.Z||0;
    //水平线
    var horizonalLineGeometry=new THREE.PlaneGeometry(this.BorderWidth, this.length);
    //垂直线
    var verticalLineGeometry=new THREE.PlaneGeometry(this.BorderWidth ,this.width+this.BorderWidth*2);

    var topLine = new THREE.Mesh( horizonalLineGeometry, LineMat );
    topLine.position.set(this.positionX,this.PositionY,this.positionZ-this.width/2-this.BorderWidth/2);
    topLine.rotation.x = -Math.PI / 2.0;
    topLine.rotation.z = -Math.PI / 2.0;

    var downLine = topLine.clone();
    downLine.position.z= downLine.position.z +this.width+this.BorderWidth;
    var leftLine=new THREE.Mesh( verticalLineGeometry, LineMat );
    leftLine.position.set(this.positionX-this.length/2-this.BorderWidth/2,this.PositionY,this.positionZ);
    leftLine.rotation.x = -Math.PI / 2.0;

    var rightLine=leftLine.clone();
    rightLine.position.x=rightLine.position.x+this.length+this.BorderWidth;

    var positionY=this.PositionY;
    var positionX=this.positionX;
    var positionZ=this.positionZ;
    var group=new THREE.Group();
    group.add(topLine);
    group.add(downLine);
    group.add(leftLine);
    group.add(rightLine);

    new THREE.FontLoader().load('./res/fonts/FZYaoTi_Regular.json',function(font){
        ////加入立体文字
        var text= new THREE.TextGeometry(option.Title.Text,{
            // 设定文字字体
            font:font,
            //尺寸
            size:option.Title.FontSize,
            //厚度
            height:0.1
        });
        text.computeBoundingBox();
        //3D文字材质
        var m = new THREE.MeshStandardMaterial({color:"#" + option.Title.TextColor});
        var mesh = new THREE.Mesh(text,m);

        mesh.position.y =positionY;
        mesh.position.z = option.Title.Position.Z+positionZ;
        mesh.position.x = option.Title.Position.X+positionX;
        mesh.rotation.x = -Math.PI / 2.0;
        mesh.name=option.Name;
        mesh.id=option.No;
        group.add(mesh);
    });

    return group;
}