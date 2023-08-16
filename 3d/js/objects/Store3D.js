function Store3D() {
    this.scene = null;//场景
    this.camera = null;//相机
    this.renderer = null;//渲染器
    this.objects = [];//场景中所有对象的集合
    this.firstTime = 1;//标记程序第一次运行
    this.time=0;//标记AGV小车运行的时间
    this.roomRateShow=1;//是否显示空间利用率
    this.goodTypes=[];//存储所有的库位类型
    this.objectsRoomRate=[];//显示空间使用率时的所有对象的集合
    this.velocity = new THREE.Vector3();//
    this.direction = new THREE.Vector3();//第一人称运动的方向
    this.prevTime = performance.now();//上一次render的时间
    this.moveForward = false;//是否向前运行
    this.moveBackward = false;//是否向后运行
    this.moveLeft = false;//是否向左运行
    this.moveRight = false;//是否向右运行
    this.canJump = false;//是否可以跳
    this.objectLockPointer=[];//由于spirate类型无法通过Raycaster来获取是否点中，这里用来存错所有的spirate对象
    this.spriteIsShow=1;
    this.storeIsShow=1;//是否显示库房
    this.groupIsShow=1;//是否显示排
    this.shelfIsShow=1;//是否显示架子
    
}

/**
 * 初始化仓库所有插件
 */
Store3D.prototype.initMain = function () {
    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.initOrbitControl();
    this.initStats();
    this.initAxisHelper();
    this.initBuilding();
    this.initLight();
    this.initoutLine();
    this.initComposer();
    this.initObjectSelect();
    this.initAgvCar();
    this.addSkybox();
    
    this.initReSize(this);
    this.initPointLockControl(this);
},
    Store3D.prototype.initSub=function(type,no){
        this.initScene();
        this.initCameraSub(type);
        this.initRenderer();
        this.initOrbitControl();
        this.initLight();
        if(type=='Store')
        {
            this.initSubStore(no);
        }
        else if(type=='StoreGroup')
        {
           this.initSubGroup(no);
        }
        this.initoutLine();
        this.initComposer();
        this.initObjectSelect();
    }
    /**
     * 仓库整体开始运行
     */
    Store3D.prototype.start = function () {
        this.initMain();
        this.animate();
    },
        Store3D.prototype.startSub = function () {
            this.animateSub();
        },


    /**
     初始化场景，仅仅需要有句话就可以生命一个场景，非常简单
     **/
    Store3D.prototype.initScene = function () {
        this.scene = new THREE.Scene();      
    },

    Store3D.prototype.initCameraSub=function(type){
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.camera.position.z = 800;
        if(type=='Store') {
            this.camera.position.y = 600;
            this.camera.position.x = 200;
        }
        else if(type=='StoreGroup')
        {
            this.camera.position.y = 100;
            this.camera.position.x = 0;
        }
        this.camera.lookAt(new THREE.Vector3(0, 0,0));
        this.scene.add(this.camera);
    },
    /**
     初始化场景，因为我们做的工厂模型，尽可能的接近于真实情景，采用透视相机
     **/
    Store3D.prototype.initCamera = function () {
        //声明一个透视相机，
        // 视角：60，
        // 纵横比aspect:全屏，使用的是浏览器的宽度/高度
        //近平面near：0.1
        //远平面视角far:10000
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
        /*
        设置相机位置，注意threejs中的坐标系采用的是右手坐标系
         */
        this.camera.position.x = 0;
        this.camera.position.y = 1600;
        this.camera.position.z = 1000;
        //相机的朝向
        this.camera.lookAt(0, 0, 0);
        //将相机放到场景中
        this.scene.add(this.camera);
    },
    /**
     声名渲染器
     **/
    Store3D.prototype.initRenderer = function () {
        this.renderer = new THREE.WebGLRenderer(
            {
                antialias: true,//是否开启反锯齿，设置为true开启反锯齿。
                alpha: true,//是否可以设置背景色透明。
                logarithmicDepthBuffer: true//模型的重叠部位便不停的闪烁起来。这便是Z-Fighting问题，为解决这个问题，我们可以采用该种方法
            }
        );
        this.renderer.setSize(window.innerWidth, window.innerHeight);//渲染器的尺寸与windows的尺寸相同
        this.renderer.setClearColor(0x39609B);//设置渲染的背景颜色
        this.renderer.setPixelRatio(window.devicePixelRatio);//设置渲染器的分辨率与浏览器电脑本身的分辨率相同
        //将渲染器添加到我们的网页中，可以将渲染的内容在网页中显示出来
        let container = document.getElementById("container");
        container.appendChild(this.renderer.domElement);
    },
    /**
     * 效果组合器Composer
     */
    Store3D.prototype.initComposer=function(){
        let renderPass = new THREE.RenderPass(this.scene, this.camera);
        this.composer = new THREE.EffectComposer(this.renderer);
        this.composer.addPass(renderPass);
        this.composer.addPass(this.outlinePass);
    },
    /**
     * 初始化OutLinePass
     */
    Store3D.prototype.initoutLine=function(){
        this.outlinePass = new THREE.OutlinePass(new THREE.Vector2(window.innerWidth, window.innerWidth), this.scene, this.camera);
        this.outlinePass.edgeStrength = 10;//包围线浓度
        this.outlinePass.edgeGlow = 0.1;//边缘线范围
        this.outlinePass.edgeThickness = 1;//边缘线浓度
        this.outlinePass.pulsePeriod = 2;//包围线闪烁评率
        this.outlinePass.visibleEdgeColor.set('#B31985');//包围线颜色
        this.outlinePass.hiddenEdgeColor.set('#190a05');//被遮挡的边界线颜色
    },


    /**
     * 初始化物体选中控件
     */
    Store3D.prototype.initObjectSelect=function(){
        new ObjectSelect(this.scene, this.camera,this.outlinePass);
    },
    /**
     * 初始化灯光
     */
    Store3D.prototype.initLight = function () {
        //首先添加个环境光
        let ambient = new THREE.AmbientLight(0xffffff, 1); //AmbientLight,影响整个场景的光源
        ambient.position.set(0, 0, 0);
        this.addObject(ambient);
        //添加平行光,平行光类似于太阳光
        let directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);//模拟远处类似太阳的光源
        directionalLight.position.set(0, 200, 0);
        this.addObject(directionalLight);
        //设置点光源
        let pointLight1 = new THREE.PointLight(0xffffff, 0.3);
        pointLight1.position.set(-500, 200, 0);
        this.addObject(pointLight1);
        let pointLight2 = new THREE.PointLight(0xffffff, 0.3);
        pointLight2.position.set(500, 200, 0);
        this.addObject(pointLight2);
    },
  
    /**
     初始化相机控件OrbitControl
     */
    Store3D.prototype.initOrbitControl = function () {
        this.orbitControl = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.orbitControl.enableDamping = true;
        this.orbitControl.dampingFactor = 0.5;
        // 视角最小距离
        this.orbitControl.minDistance = 0;
        // 视角最远距离
        this.orbitControl.maxDistance = 2000;
        // 最大角度
        this.orbitControl.maxPolarAngle = Math.PI / 2.2;
    },
    /**
     * 初始化性能控件Stats
     */
    Store3D.prototype.initStats = function () {
        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.left = '0px';
        this.stats.domElement.style.up = '0px';

        document.body.appendChild(this.stats.domElement);
    },
    /**
     * 初始化坐标系辅助控件
     */
    Store3D.prototype.initAxisHelper = function () {
        let axes = new THREE.AxisHelper(1000);
        this.addObject(axes);
    },
    Store3D.prototype.initLabel = function () {
        let label = new Label("我们是冠军", {
            fontsize: 50
        });
        label.position.set(0, 500, 0);
        this.addObject(label);
    },
    /**
     * 向场景中添加物体，并记录到
     */
    Store3D.prototype.addObject = function (object) {
        this.scene.add(object);
        this.objects.push(object);
    },
    /**
     * 移动AGV小车
     */
    Store3D.prototype.moveAgvCar=function()
    {
        if(this.curve&&this.AgvCar){
            this.time=this.time+1;
            let points=this.curve.getPoints(2000);
            let point = points[this.time];
            let point1 =points[this.time+1];
            if(this.time>=2000)
                this.time=0;
            if(point&&point.x){

                this.AgvCar.position.set(point.x,40,point.z);
                this.AgvCar.lookAt(point1.x,40,point1.z);
            }
        }
    },
    /**
     创建建筑物
     */
    Store3D.prototype.initBuilding = function () {
	var abc=this;
        let buildingData = buildingObjects.objects;
        for (let i = 0; i < buildingData.length; i++) {
            let objectOption = buildingData[i];
            switch (objectOption.objectType) {
                case "cube":
                   
                    let cube = new Cube(objectOption);
                    this.addObject(cube);
                    break;
                case "wall":
                    let wall = new Wall(objectOption);
                    this.addObject(wall);
                    break;
                case "route":
                    this.curve=new Route(objectOption);
                    let line=new RouteLine(this.curve,objectOption);
                    this.addObject(line);
                    break;
            }
        }
        
        var OBJLoader = new THREE.OBJLoader();//obj加载器
        var MTLLoader = new THREE.MTLLoader();//材质文件加载器
        MTLLoader.load('res/file.mtl', function(materials) {
        // 返回一个包含材质的对象MaterialCreator
         //obj的模型会和MaterialCreator包含的材质对应起来
        OBJLoader.setMaterials(materials);
        OBJLoader.load('res/file.obj', function(obj) {
        obj.scale.set(10, 10, 10); //放大obj组对象
        obj.rotateY(-Math.PI / 2);
        obj.translateY(100);
        obj.translateX(500);
        obj.translateZ(-6);       
        abc.addObject(obj);//返回的组对象插入场景中
      })
    })
    },
    Store3D.prototype.showAgvCar=function(object){
        object.name = "AGV小车";
        object.position.set(-100,40,100);
        this.AgvCar=object;
        this.addObject(object);
         
    },

    Store3D.prototype.initAgvCar=function()
    {
       let agvCar=new AGVCar();
       agvCar.Load(this,'showAgvCar')
    },
    /**
     * 显示控件利用率
     */
    Store3D.prototype.showRoomRate=function(){
        let Store3DData = eval('(' + window.localStorage.getItem('Store3DData') + ')');
        if (Store3DData !== null) {
            for (let i = 0; i < Store3DData.Areas.length; i++) {

                let optionArea = Store3DData.Areas[i];
                let area = new StoreArea(optionArea);
                for (let j = 0; j < optionArea.Stores.length; j++) {
                    let optionStore = optionArea.Stores[j];
                    optionStore = CommonFunction.transPosition(optionStore, optionArea);
                    for (let k = 0; k < optionStore.Groups.length; k++) {
                        let optionGroup = optionStore.Groups[k];
                        optionGroup = CommonFunction.transPosition(optionGroup, optionStore);
                        let height=optionGroup.Height*(optionGroup.OccurpyBinNum/optionGroup.TotalBinNum);

                        optionGroup.Height=1;
                        optionGroup.Position.Y=1;
                        let group = new StoreGroup(optionGroup,2);
                        this.addObject(group);
                        this.objectsRoomRate.push(group);
                        var tween1 = new TWEEN.Tween(group.scale).to({
                            y: height
                        }, 3000).easing(TWEEN.Easing.Quadratic.In).onComplete(function () {
                        });
                        var tween2 = new TWEEN.Tween(group.position).to({
                            y: height/2
                        }, 3000).easing(TWEEN.Easing.Quadratic.In).onComplete(function () {
                        });
                        tween1.start();
                        tween2.start();
                    }
                }
            }
        }

    },
    /**
     * 根据ID或者名称移除对象
     */
    Store3D.prototype.removeObject = function (nameorid) {
        for (let i = 0; i < this.objects.length; i++) {
            let tmpObject = this.objects[i];
            if (tmpObject.name == nameorid || tmpObject.id == nameorid) {
                this.objects.splice(i, 1);
                this.scene.remove(tmpObject);
            }

        }
    },
    /**
     * 显示或者隐温度控件
     */
    Store3D.prototype.changeTemperatureShow=function(){
        if (this.tmpIsShow == 1) {
            for (let i = 0; i < this.objectLockPointer.length; i++) {
                let tmpObject = this.objectLockPointer[i];
                if (tmpObject.type == "Temperature") {
                    this.removeObject(tmpObject.id);
                }
                else if(tmpObject.type == "StoreSign")
                {
                    this.addObject(tmpObject);
                }
            }
            this.tmpIsShow =0;
        }
        else {
            for (let i = 0; i < this.objectLockPointer.length; i++) {
                let tmpObject = this.objectLockPointer[i];
                if (tmpObject.type == "Temperature") {
                    this.addObject(tmpObject);
                }
                else if(tmpObject.type == "StoreSign")
                {
                    this.removeObject(tmpObject.id);
                }
            }
            this.tmpIsShow =1;
        }
    },



    /**
     * 显示空间利用率
     */
    Store3D.prototype.changeRoomRateShow=function(){
        //显示空间利用率
        if(this.roomRateShow==1)
        {
            //隐藏架子
            for (let i = 0; i < this.objects.length; i++) {
                let tmpObject = this.objects[i];
                if (
                    tmpObject.type == "StoreShelf"||
                    tmpObject.type == "StoreGoods") {
                    this.scene.remove(tmpObject);
                }
            }
            this.showRoomRate();
            this.roomRateShow=0;
        }
        //隐藏空间
        else
        {
            for (let i = 0; i < this.objects.length; i++) {
                let tmpObject = this.objects[i];
                if (tmpObject.type == "StoreShelf"||
                    tmpObject.type == "StoreGoods")  {
                    this.scene.add(tmpObject);
                }
            }
            for(let j=0;j<this.objectsRoomRate.length;j++)
            {
                let tmpObject = this.objectsRoomRate[j];
                this.removeObject(tmpObject.id);
            }
            this.objectsRoomRate=[];
            this.roomRateShow=1;
        }
    },
    //显示空间利用率
    Store3D.prototype.showRoomRate=function(){

        let Store3DData = eval('(' + window.localStorage.getItem('Store3DData') + ')');
        if (Store3DData !== null) {
            for (let i = 0; i < Store3DData.Areas.length; i++) {

                let optionArea = Store3DData.Areas[i];
                let area = new StoreArea(optionArea);
                for (let j = 0; j < optionArea.Stores.length; j++) {
                    let optionStore = optionArea.Stores[j];
                    optionStore.Position = CommonFunction.transPosition(optionStore.Position, optionArea.Position);
                    for (let k = 0; k < optionStore.Groups.length; k++) {
                        let optionGroup = optionStore.Groups[k];
                        optionGroup.Position = CommonFunction.transPosition(optionGroup.Position, optionStore.Position);
                        let height=optionGroup.Height*(optionGroup.OccurpyBinNum/optionGroup.TotalBinNum);

                        let group = new StoreGroup(optionGroup);
                        this.addObject(group);
                        this.objectsRoomRate.push(group);
                        optionGroup.Height=1;
                        optionGroup.Position.Y=1;
                        let groupRate = new StoreGroup(optionGroup,2);
                        this.addObject(groupRate);

                        this.objectsRoomRate.push(groupRate);
                        var tween1 = new TWEEN.Tween(groupRate.scale).to({
                            y: height
                        }, 3000).easing(TWEEN.Easing.Quadratic.In).onComplete(function () {
                        });
                        var tween2 = new TWEEN.Tween(groupRate.position).to({
                            y: height/2
                        }, 3000).easing(TWEEN.Easing.Quadratic.In).onComplete(function () {
                        });
                        tween1.start();
                        tween2.start();
                    }
                }
            }
        }
    },
    /***********************************************
     * 隐藏或者显示所有的仓库对象
     */
    Store3D.prototype.changeStoreShow = function () {
        if (this.storeIsShow == 1) {
            for (let i = 0; i < this.objects.length; i++) {
                let tmpObject = this.objects[i];
                if (tmpObject.type == "Store") {
                    this.scene.remove(tmpObject);
                }
            }
            this.storeIsShow = 0;
        } else {
            for (let i = 0; i < this.objects.length; i++) {
                let tmpObject = this.objects[i];
                if (tmpObject.type == "Store") {
                    this.scene.add(tmpObject);
                }
            }
            this.storeIsShow = 1;
        }
    },
    /***********************************************
     * 隐藏或者显示所有的巷道对象
     */
    Store3D.prototype.changeGroupShow = function () {
        if (this.groupIsShow == 1) {
            for (let i = 0; i < this.objects.length; i++) {
                let tmpObject = this.objects[i];
                if (tmpObject.type == "StoreGroup") {
                    this.scene.remove(tmpObject);
                }
            }
            this.groupIsShow =0;
        }
        else {
            for (let i = 0; i < this.objects.length; i++) {
                let tmpObject = this.objects[i];
                if (tmpObject.type == "StoreGroup") {
                    this.scene.add(tmpObject);
                }
            }
            this.groupIsShow =1;
        }
    },
    /***********************************************
     * 隐藏或者显示所有仓库框架
     */
    Store3D.prototype.changeShelfShow=function(){
        if(this.shelfIsShow==1)
        {
            for (let i = 0; i < this.objects.length; i++) {
                let tmpObject = this.objects[i];
                if (tmpObject.type == "StoreShelf") {
                    this.scene.remove(tmpObject);
                }
            }
            this.shelfIsShow =0;
        }
        else
        {
            for (let i = 0; i < this.objects.length; i++) {
                let tmpObject = this.objects[i];
                if (tmpObject.type == "StoreShelf") {
                    this.scene.add(tmpObject);
                }
            }
            this.shelfIsShow =1;
        }
    },
        /**
         * 初始化仓库每排
         */
        Store3D.prototype.initSubGroup=function(No){
            let dataAnalyze=new  DataAnalyze();
            let group=new THREE.Group();

            if (this.firstTime == 1) {
                var optionGroup = dataAnalyze.getGroup(No);
                optionGroup.Position.X=0;
                optionGroup.Position.Y=0;
                optionGroup.Position.Z=0;
                let shelf = new StoreShelf(optionGroup);group.add(shelf);
                group.add(shelf);
                //显示库位上的货物
                for (let m = 0; m < optionGroup.Bins.length; m++) {
                    let optionBin = optionGroup.Bins[m];
                    let existGoods = this.getExistedGoodType(optionBin.State);
                    let storeGoods = new StoreGoods(optionGroup, optionBin);
                    if (existGoods == null) {
                        let goods = storeGoods.create();
                        group.add(goods);
                        this.goodTypes.push({type: optionBin.State, object: goods});
                    } else {
                        let goods = storeGoods.clone(existGoods);
                        group.add(goods);
                    }
                }
                group.rotation.y=-0.5 * Math.PI;
                this.addObject(group);
            }
        },
        /**
         * 初始化子仓库
         */
        Store3D.prototype.initSubStore=function(No){
            let dataAnalyze=new  DataAnalyze();
            if (this.firstTime == 1) {
                var storeOption = dataAnalyze.getStore(No);
                storeOption.Position.Y = 0;
                storeOption.Position.X = 0;
                //显示每行信息
                for (let k = 0; k < storeOption.Groups.length; k++) {
                    let optionGroup = storeOption.Groups[k];
                    optionGroup.Position = CommonFunction.transPosition(optionGroup.Position, storeOption.Position);
                    let shelf = new StoreShelf(optionGroup);
                    let group = new StoreGroup(optionGroup, 1);
                    this.addObject(shelf);
                    this.addObject(group);
                    //显示库位上的货物
                    for (let m = 0; m < optionGroup.Bins.length; m++) {
                        let optionBin = optionGroup.Bins[m];
                        let existGoods = this.getExistedGoodType(optionBin.State);
                        let storeGoods = new StoreGoods(optionGroup, optionBin);
                        if (existGoods == null) {
                            let goods = storeGoods.create();
                            this.addObject(goods);
                            this.goodTypes.push({type: optionBin.State, object: goods});
                        } else {
                            let goods = storeGoods.clone(existGoods);
                            this.addObject(goods);
                        }
                    }
                }
            }
            this.firstTime = 0;
        },
    /**
     * 初始化仓库相关对象
     */
    Store3D.prototype.initStoreObjects = function (object) {
        if (this.firstTime == 1) {
        	let Store3DData = JSON.parse(window.localStorage.getItem('Store3DData')); 
        	if (Store3DData !== null) {
                //显示仓库区域
                for (let i = 0; i < Store3DData.Areas.length; i++) {
                    let optionArea = Store3DData.Areas[i];
                    let area = new StoreArea(optionArea);
                    object.addObject(area);
                    //显示仓库
                    for (let j = 0; j < optionArea.Stores.length; j++)//
                    {
                        let optionStore = optionArea.Stores[j];
                        optionStore.Position = CommonFunction.transPosition(optionStore.Position, optionArea.Position);
                        let store = new Store(optionStore);
                        object.addObject(store);
                        let storeSign = new StoreSign(optionStore, this);
                        let storeTemperature=new Temperature(optionStore, this);
                        //显示每行信息
                        for (let k = 0; k < optionStore.Groups.length; k++) {
                            let optionGroup = optionStore.Groups[k];
                            optionGroup.Position = CommonFunction.transPosition(optionGroup.Position, optionStore.Position);
                            let shelf = new StoreShelf(optionGroup);
                            let group=new StoreGroup(optionGroup,1);
                            object.addObject(shelf);
                            object.addObject(group);
                            //显示库位上的货物
                            for (let m = 0; m < optionGroup.Bins.length; m++) {
                                let optionBin = optionGroup.Bins[m];
                                let existGoods=this.getExistedGoodType(optionBin.State);
                                let storeGoods = new StoreGoods(optionGroup, optionBin);
                                if(existGoods==null) {
                                    let goods=storeGoods.create();
                                    object.addObject(goods);
                                    this.goodTypes.push({type: optionBin.State, object: goods});
                                }
                                else
                                {
                                    let goods= storeGoods.clone(existGoods);
                                    object.addObject(goods);
                                }
                            }
                        }

                    }
                }
                this.firstTime = 0;
            }
        }
    	      
    },

    /*******************************************************************************
     * 改变背景，是否添加背景盒子
     *******************************************************************************/
    Store3D.prototype.changeBackGround = function () {
        if (this.scene.getObjectByName('StarSky', false) == undefined) {
            this.addObject(skyBox);
        } else {
            this.removeObject(skyBox.name);
        }
    },

    /**
     * 添加天空盒
     */

    Store3D.prototype.addSkybox = function () {
        let urls = [
            './res/skybox/px.jpg', // right
            './res/skybox/nx.jpg', // left
            './res/skybox/py.jpg', // top
            './res/skybox/ny.jpg', // bottom
            './res/skybox/pz.jpg', // back
            './res/skybox/nz.jpg'  // front
        ];
        let skyboxCubemap = new THREE.CubeTextureLoader().load(urls);
        skyboxCubemap.format = THREE.RGBFormat;

        let skyboxShader = THREE.ShaderLib['cube'];
        skyboxShader.uniforms['tCube'].value = skyboxCubemap;
        skyBox = new THREE.Mesh(
            new THREE.BoxGeometry(10000, 10000, 10000),
            new THREE.ShaderMaterial({
                fragmentShader: skyboxShader.fragmentShader,
                vertexShader: skyboxShader.vertexShader,
                uniforms: skyboxShader.uniforms,
                depthWrite: false,
                side: THREE.BackSide
            })
        );
        skyBox.name = 'StarSky';
    },

    /**
     * 获取是否已经生成同类型的货物
     */
    Store3D.prototype.getExistedGoodType=function(state){
        for (let i=0;i<this.goodTypes.length;i++)
        {
            let type=this.goodTypes[i];
            if(type.type===state)
            {
                return type.object;
            }

        }
        return null;

    },
    /**
     *显示或者隐藏所有sprite控件
     */
    Store3D.prototype.changeSpriteShow=function(){
        if (this.spriteIsShow == 1) {
            for (let i = 0; i < this.objectLockPointer.length; i++) {
                let tmpObject = this.objectLockPointer[i];
                    this.removeObject(tmpObject.id);
            }
            this.spriteIsShow =0;
        }
        else {
            for (let i = 0; i < this.objectLockPointer.length; i++) {
                let tmpObject = this.objectLockPointer[i];
                    this.addObject(tmpObject);
            }
            this.spriteIsShow =1;
        }
    },


    /**
     * 初始化PointLockControl
     * 设置鼠标控制
     */
    Store3D.prototype.initPointLockControl=function(object){
        this.lockcontrols = new THREE.PointerLockControls( this.camera );
        this.raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

        var onKeyDown = function ( event ) {
            switch ( event.keyCode ) {

                case 38: // up
                case 87: // w
                    object.moveForward = true;
                    break;

                case 37: // left
                case 65: // a
                    object.moveLeft = true;
                    break;

                case 40: // down
                case 83: // s
                    object.moveBackward = true;
                    break;

                case 39: // right
                case 68: // d
                    object.moveRight = true;
                    break;

                case 32: // space
                    if ( object.canJump === true ) object.velocity.y += 350;
                    object.canJump = false;
                    break;

            }


        };
        var onKeyUp = function ( event ) {

            switch ( event.keyCode ) {

                case 38: // up
                case 87: // w
                    object.moveForward = false;
                    break;

                case 37: // left
                case 65: // a
                    object.moveLeft = false;
                    break;

                case 40: // down
                case 83: // s
                    object.moveBackward = false;
                    break;

                case 39: // right
                case 68: // d
                    object.moveRight = false;
                    break;

            }

        };
        document.addEventListener( 'keydown', onKeyDown, false );
        document.addEventListener( 'keyup', onKeyUp, false );
    },

    /**
     * 开启鼠标锁定
     */
    Store3D.prototype.lockControl=function() {
        if(this.spriteIsShow==1)
        {
            this.changeSpriteShow();
        }
        this.camera.position.y = 100;
        this.camera.lookAt(0,100,0);
        this.lockcontrols.getObject().position.x =0;
        this.lockcontrols.getObject().position.y =100;
        this.lockcontrols.getObject().position.z =580;
        this.lockcontrols.lock();
    },

    /**
     * 第一人称视角移动
     */
    Store3D.prototype.firstPersonMove=function(){

        if ( this.lockcontrols.isLocked === true ) {
            this.raycaster.ray.origin.copy( this.lockcontrols.getObject().position );
            this.raycaster.ray.origin.y -= 10;
            var intersections = this.raycaster.intersectObjects( this.objects );
            var onObject = intersections.length > 0;
            var time = performance.now();
            var delta = ( time - this.prevTime ) / 1000;
            this.velocity.x -= this.velocity.x * 10.0 * delta;
            this.velocity.z -= this.velocity.z * 10.0 * delta;
            this.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

            this.direction.z = Number( this.moveForward ) - Number( this.moveBackward );
            this.direction.x = Number( this.moveLeft ) - Number( this.moveRight );
            this.direction.normalize(); // this ensures consistent movements in all directions

            if ( this.moveForward || this.moveBackward ) this.velocity.z -= this.direction.z * 2000.0 * delta;
            if ( this.moveLeft || this.moveRight ) this.velocity.x -= this.direction.x * 2000.0 * delta;

            if ( onObject === true ) {

                this.velocity.y = Math.max( 0, this.velocity.y );
                this.canJump = true;

            }
            this.lockcontrols.getObject().translateX( this.velocity.x * delta );
            this.lockcontrols.getObject().position.y += ( this.velocity.y * delta ); // new behavior
            this.lockcontrols.getObject().translateZ( this.velocity.z * delta );

            if ( this.lockcontrols.getObject().position.y < 100 ) {

                this.velocity.y = 0;
                this.lockcontrols.getObject().position.y = 100;
                this.canJump = true;
            }
            this.prevTime = time;
        }
    },
    /**
     * 显示或者隐藏性能控件
     */
    Store3D.prototype.changeStats = function () {
        if (this.stats.domElement.style.display == 'none')
            this.stats.domElement.style.display = 'block';
        else
            this.stats.domElement.style.display = 'none';
    }
    /**
     * 浏览器窗口尺寸变化
     */
    Store3D.prototype.initReSize=function(object){
        window.addEventListener('resize', function () {
            object.camera.aspect = window.innerWidth / window.innerHeight;
            object.camera.updateProjectionMatrix();
            object.renderer.setSize(window.innerWidth, window.innerHeight);
        }, false);
    },
    /**
     * 定时重复刷新
     */
    Store3D.prototype.animate = function () {
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
        this.firstPersonMove();
        this.stats.update();
        this.composer.render();
        TWEEN.update();
        this.initStoreObjects(this);
        this.moveAgvCar();
    },
    Store3D.prototype.animateSub=function () {
        requestAnimationFrame(this.animateSub.bind(this));
        this.renderer.render(this.scene, this.camera);
        this.composer.render();
    }



