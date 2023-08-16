function Route(option) {

    let curvePoints=new Array();
    for(let i=0;i<option.points.length;i++)
    {
        let point=option.points[i];
        curvePoints.push(new THREE.Vector3(point.x, point.y, point.z));
    }
    let curve = new THREE.CatmullRomCurve3(curvePoints,false/*是否闭合*/,'catmullrom',0.000000001);
    return curve;


}