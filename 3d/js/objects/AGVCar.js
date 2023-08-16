function AGVCar(option) {
    option=option||{scale:0.1};
    this.scale=option.scale;
}

AGVCar.prototype.Load=function(curObj,callBack)
{
    let mtlLoader = new THREE.MTLLoader();//mtl材质加载器
    mtlLoader.load('./models/AGV.mtl', mtl);//加载.mtl文件，执行mtl函数
    function mtl(material) {
        var objLoader = new THREE.OBJLoader();//obj模型加载器
        objLoader.setMaterials(material);//mtl材质赋值给obj模型
        objLoader.load('./models/AGV.obj', obj);//加载.obj文件，执行obj函数 }
        function obj(object3D) {
            object3D.scale.set(0.1,0.1,0.1);//放大object3D对象
            object3D.traverse(function (child) {
                if(child instanceof  THREE.Mesh)
                {
                    child.geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
                    child.material.transparent=true;
                }
            });
            curObj[callBack](object3D);
        }
    }
}
