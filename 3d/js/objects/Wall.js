/**
 * 墙体对象
 * @param option
 * @returns {Group|*}
 * @constructor
 */
function  Wall(option) {
    let group = new THREE.Group();
    let wallOption= {
        objName: option.objName,
        objType: 'cube',
        length: option.length,
        width: option.width,
        height: option.height,
        position: {
            x: option.position.x,
            y: option.position.y,
            z: option.position.z
        },
        style: option.style,
    };
    let wall=new Cube(wallOption);

    if(!CommonFunction.hasObj(option.childrens))
    {
        wall.type="wall";
        return wall;
    }
    for(let i=0;i<option.childrens.length;i++)
    {
        let optionChildren=option.childrens[i];
        //如果是墙洞子，比如窗户洞，门洞等
        if(optionChildren.objectType=="wallHole")
        {
            let hole = new Cube(optionChildren);
            wall = new ObjectCombine(wall, hole, 2);
            optionChildren.name= option.objName;

        }
        else if(optionChildren.objectType=="doorFrame")
        {
            let doorFrame=new Cube(optionChildren);
            doorFrame.type="doorFrame";
            group.add(doorFrame);
        }
        else if(optionChildren.objectType=="door")
        {
            let door=new Cube(optionChildren);
            door.type="door";
            group.add(door);
        }
        else if(optionChildren.objectType=="windowFrame")
        {
            let windowFrame=new Cube(optionChildren);
            windowFrame.type="windowFrame";
            group.add(windowFrame);
        }

    }
    wall.type="wall";
    group.add(wall);
    return group;
}