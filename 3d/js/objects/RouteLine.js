function RouteLine(curve,option) {

    let points = curve.getPoints(100);
    let geometry = new THREE.Geometry();
    //geometry.vertices = curve.getSpacedPoints(100);
    // 把从曲线轨迹上获得的顶点坐标赋值给几何体
    geometry.vertices = points;
    var material = new THREE.LineBasicMaterial({
        color: 0x4488ff
    });
    let line = new THREE.Line(geometry, material);
    line.uuid=option.No;
    line.name=option.Name;
    line.type="Route";
    return line;
}