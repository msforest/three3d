
//定义网格组合对象类型
let MeshCombineType={
    intersect:0,//交集
    union:  1,//并集
    subtract:2//差集
}
/*
   对几何体进行组合
   originalObject:初始几何体
   combineObject:要进行组合的几何体
   meshCombineType：几何体组合类型
 */
function ObjectCombine(originalObject,combineObject,meshCombineType) {
    let resultBsp=null;
    let originalBsp=new ThreeBSP(originalObject);
    let combineBsp=new ThreeBSP(combineObject);
    if(meshCombineType==MeshCombineType.union)
    {
        resultBsp=originalBsp.union(combineBsp);
    }
    else if(meshCombineType==MeshCombineType.intersect)
    {
        resultBsp=originalBsp.intersect(combineBsp);
    }
    else
    {
        resultBsp=originalBsp.subtract(combineBsp);
    }
    let material=originalObject.material;
    let result=resultBsp.toMesh(material);
    result.material.flatShading  = true;//平坦着色,设置平坦着色，
    //使用`geometry`的computeFaceNormals()和computeVertexNormals()来确保生成的`Mesh`对象的所有面和顶点的法向量可以正确计算
    result.geometry.computeFaceNormals();
    result.geometry.computeVertexNormals();

    result.material.needsUpdate = true;  //更新纹理
    result.geometry.buffersNeedUpdate = true;
    result.geometry.uvsNeedUpdate = true;

    result.castShadow=true;//可以生成阴影
    result.receivedAlert=true;
    return result;
}