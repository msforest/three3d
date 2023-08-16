
function DataShow(type,no) {
    this.type=type;
    this.no=no;
    this.colRowDistributionChart = null;
    this.RowDistributionChart = null;
}
DataShow.prototype.showHint=function(){
    let htmltext='';
    let dataAnalyze = new DataAnalyze(this.no);
    if(this.type=='Store'||this.type=='StoreSign')
    {
        let store= dataAnalyze.getStore(this.no);
        htmltext='<p>仓库编码：'+store.No +'</p>';
        htmltext+='<p>仓库名称：'+store.Name +'</p>';
        htmltext+='<p>总库存：'+dataAnalyze.getStoreTotalBin(this.no) +'</p>';
        htmltext+='<p>已占库存：'+dataAnalyze.getStoreOccurpyBin(this.no) +'</p>';
        htmltext+='<p>今日进货：'+dataAnalyze.getStoreTotalBin(this.no) +'</p>';
        htmltext+='<p>今日已销售：'+dataAnalyze.getStoreOccurpyBin(this.no) +'</p>';
        htmltext+='<p1>提示：双击可查看详细信息</p1>';
    }
    else if(this.type=='StoreGroup')
    {
        let group= dataAnalyze.getGroup(this.no);
        htmltext='<p>编码：'+group.No +'</p>';
        htmltext+='<p>名称：'+group.Name +'</p>';
        htmltext+='<p>总库存：'+dataAnalyze.getGroupTotalBin(this.no) +'</p>';
        htmltext+='<p>已占库存：'+dataAnalyze.getGroupOccurpyBin(this.no) +'</p>';
        htmltext+='<p>今日进货：'+dataAnalyze.getGroupTotalBin(this.no) +'</p>';
        htmltext+='<p>今日已销售：'+dataAnalyze.getGroupOccurpyBin(this.no) +'</p>';
        htmltext+='<p1>提示：双击可查看详细信息</p1>';
    }
    else if(this.type=='StoreGoods')
    {
        let bin= dataAnalyze.getBin(this.no);
        htmltext='<p>编码：'+bin.No +'</p>';
        htmltext+='<p>名称：'+bin.Name +'</p>';
        htmltext+='<p>货号：'+bin.Barcode +'</p>';
        htmltext+='<p>生产日期：'+bin.c_date +'</p>';
        htmltext+='<p>保质期：'+bin.s_date +'</p>';
        htmltext+='<p>产地：'+bin.cd +'</p>';
        htmltext+='<p>状态：'+bin.State +'</p>';
        htmltext+='<a href="javascript:var arr=window.localStorage.getItem(\'gwcData\');if(arr==null)arr=[];else arr=JSON.parse(arr);'
        +'var b=true;for(var i=0;i<arr.length;i++){if(arr[i].name==\''+bin.Name+'\'){arr[i].count=arr[i].count+1;b=false;break;}};'
        +'if(b){var obj=new Object();obj.name=\''+bin.Name+'\';obj.count=1;arr.push(obj);}window.localStorage.setItem(\'gwcData\',JSON.stringify(arr));'
        +'alert(\'已加入购物车\');"><input type="button" value="加入购物车" ></a>';
    }
    return htmltext;
},


    DataShow.prototype.initStoreData = function () {
        this.initRowDistribution();
        this.initAbnomalBinData();
        this.initTotalData();
    },
    DataShow.prototype.refreshStoreData=function(){
        this.refreshRowDistribution(this.no);
        this.reFreshAbnomalBinData(this.no);
        this.refreshTotalData(this.no);
        this.refreshStoreInOutNum(this.no);
    },

    DataShow.prototype.initGroupData=function(){
        this.initColRowDistribution();
        this.initColAbnomalBinData();
        this.initColTotalData();
    },
    DataShow.prototype.refreshGroupData=function()
    {
        this.refreshColRowDistribution(this.no);
        this.reFreshColAbnomalBinData(this.no);
        this.refreshGroupTotalData(this.no);
        this.refreshGroupInOutNUm(this.no);
    },

    DataShow.prototype.initColRowDistribution = function () {
        this.colRowDistributionChart = echarts.init(document.getElementById('colRowDistribution'));
        option = {
            //  backgroundColor: '#00265f',
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '0%',
                top: '10px',
                right: '0%',
                bottom: '4%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: ['第一列', '第二列', '第三列', '第四列'],
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "rgba(255,255,255,.1)",
                        width: 1,
                        type: "solid"
                    },
                },

                axisTick: {
                    show: false,
                },
                axisLabel: {
                    interval: 0,
                    // rotate:50,
                    show: true,
                    splitNumber: 15,
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: '12',
                    },
                },
            }],
            yAxis: [{
                type: 'value',
                axisLabel: {
                    //formatter: '{value} %'
                    show: true,
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: '12',
                    },
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "rgba(255,255,255,.1	)",
                        width: 1,
                        type: "solid"
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.1)",
                    }
                }
            }],
            series: [
                {
                    type: 'bar',
                    data: [200, 300, 300, 900],
                    barWidth: '35%', //柱子宽度
                    // barGap: 1, //柱子之间间距
                    itemStyle: {
                        normal: {
                            color: '#2f89cf',
                            opacity: 1,
                            barBorderRadius: 5,
                        }
                    }
                }

            ]
        }
        this.colRowDistributionChart.setOption(option);
    },


    DataShow.prototype.refreshColRowDistribution = function (no) {
        let dataAnalyze = new DataAnalyze();
        dataAnalyze.getGroup(no);
        var option = this.colRowDistributionChart.getOption();
        option.series[0].data = dataAnalyze.getColDistributionNums();
        option.xAxis[0].data = dataAnalyze.getColDistributionNames();
        this.colRowDistributionChart.setOption(option);

    },
    DataShow.prototype.initHeatMap=function(){
        this.tempratureChart=echarts.init(document.getElementById('heatMapChart'));
    },



    DataShow.prototype.initTemperature=function()
    {
        this.tempratureChart=echarts.init(document.getElementById('temptureChart'));
        var TP_value = 40;
        var kd = [];
        var Gradient = [];
        var leftColor = '';
        var showValue = '';
        var boxPosition = [65, 0];
        var TP_txt = ''
        // 刻度使用柱状图模拟，短设置1，长的设置3；构造一个数据
        for(var i = 0, len = 135; i <= len; i++) {
            if(i < 10 || i > 130) {
                kd.push('')
            } else {
                if((i - 10) % 20 === 0) {
                    kd.push('-3');
                } else if((i - 10) % 4 === 0) {
                    kd.push('-1');
                } else {
                    kd.push('');
                }
            }

        }
        //中间线的渐变色和文本内容
        if(TP_value > 20) {
            TP_txt = '温度偏高';
            Gradient.push({
                offset: 0,
                color: '#93FE94'
            }, {
                offset: 0.5,
                color: '#E4D225'
            }, {
                offset: 1,
                color: '#E01F28'
            })
        } else if(TP_value > -20) {
            TP_txt = '温度正常';
            Gradient.push({
                offset: 0,
                color: '#93FE94'
            }, {
                offset: 1,
                color: '#E4D225'
            })
        } else {
            TP_txt = '温度偏低';
            Gradient.push({
                offset: 1,
                color: '#93FE94'
            })
        }
        if(TP_value > 62) {
            showValue = 62
        } else {
            if(TP_value < -60) {
                showValue = -60
            } else {
                showValue = TP_value
            }
        }
        if(TP_value < -10) {
            boxPosition = [65, -120];
        }
        leftColor = Gradient[Gradient.length - 1].color;
        // 因为柱状初始化为0，温度存在负值，所以加上负值60和空出距离10
        var option = {
            backgroundColor: 'rgba(84, 173, 155, 0.2)',
            title: {
                text: '温度计',
                show: false
            },
            yAxis: [{
                show: false,
                data: [],
                min: 0,
                max: 135,
                axisLine: {
                    show: false
                }
            }, {
                show: false,
                min: 0,
                max: 50,
            }, {
                type: 'category',
                data: ['', '', '', '', '', '', '', '', '', '', '°C'],
                position: 'left',
                offset: -80,
                axisLabel: {
                    fontSize: 10,
                    color: 'white'
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
            }],
            xAxis: [{
                show: false,
                min: -10,
                max: 80,
                data: []
            }, {
                show: false,
                min: -10,
                max: 80,
                data: []
            }, {
                show: false,
                min: -10,
                max: 80,
                data: []
            }, {
                show: false,
                min: -5,
                max: 80,

            }],
            series: [{
                name: '条',
                type: 'bar',
                // 对应上面XAxis的第一个对)象配置
                xAxisIndex: 0,
                data: [{
                    value: (showValue + 70),
                    label: {
                        normal: {
                            show: true,
                            position: boxPosition,

                            width: 200,
                            height: 100,
                            formatter: '{back| ' + TP_value + ' }{unit|°C}\n{downTxt|' + TP_txt + '}',
                            rich: {
                                back: {
                                    align: 'center',
                                    lineHeight: 50,
                                    fontSize: 100,
                                    fontFamily: 'digifacewide',
                                    color: leftColor
                                },
                                unit: {
                                    fontFamily: '微软雅黑',
                                    fontSize: 60,
                                    lineHeight: 50,
                                    color: leftColor
                                },
                                downTxt: {
                                    lineHeight: 100,
                                    fontSize: 60,
                                    align: 'center',
                                    color: '#E01F28'
                                }
                            }
                        }
                    }
                }],

                barWidth: 18,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, Gradient)
                    }
                },
                z: 2
            }, {
                name: '白框',
                type: 'bar',
                xAxisIndex: 1,
                barGap: '-100%',
                data: [134],
                barWidth: 28,
                itemStyle: {
                    normal: {
                        color: '#0C2E6D',
                        barBorderRadius: 50,
                    }
                },
                z: 1
            }, {
                name: '外框',
                type: 'bar',
                xAxisIndex: 2,
                barGap: '-100%',
                data: [135],
                barWidth: 38,
                itemStyle: {
                    normal: {
                        color: '#4577BA',
                        barBorderRadius: 50,
                    }
                },
                z: 0
            }, {
                name: '圆',
                type: 'scatter',
                hoverAnimation: false,
                data: [0],
                xAxisIndex: 0,
                symbolSize: 48,
                itemStyle: {
                    normal: {
                        color: '#93FE94',
                        opacity: 1,
                    }
                },
                z: 2
            }, {
                name: '白圆',
                type: 'scatter',
                hoverAnimation: false,
                data: [0],
                xAxisIndex: 1,
                symbolSize: 60,
                itemStyle: {
                    normal: {
                        color: '#0C2E6D',
                        opacity: 1,
                    }
                },
                z: 1
            }, {
                name: '外圆',
                type: 'scatter',
                hoverAnimation: false,
                data: [0],
                xAxisIndex: 2,
                symbolSize: 70,
                itemStyle: {
                    normal: {
                        color: '#4577BA',
                        opacity: 1,
                    }
                },
                z: 0
            }, {
                name: '刻度',
                type: 'bar',
                yAxisIndex: 0,
                xAxisIndex: 3,
                label: {
                    normal: {
                        show: true,
                        position: 'left',
                        distance: 10,
                        color: 'white',
                        fontSize: 14,
                        formatter: function(params) {
                            if(params.dataIndex > 130 || params.dataIndex < 10) {
                                return '';
                            } else {
                                if((params.dataIndex - 10) % 20 === 0) {
                                    return params.dataIndex - 70;
                                } else {
                                    return '';
                                }
                            }
                        }
                    }
                },
                barGap: '-100%',
                data: kd,
                barWidth: 1,
                itemStyle: {
                    normal: {
                        color: 'white',
                        barBorderRadius: 120,
                    }
                },
                z: 0
            }]
        };
        this.tempratureChart.setOption(option);
    },





    DataShow.prototype.initRowDistribution = function () {
        this.RowDistributionChart = echarts.init(document.getElementById('rowDistribution'));
        option = {
            //  backgroundColor: '#00265f',
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '0%',
                top: '10px',
                right: '0%',
                bottom: '4%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: ['第一列', '第二列', '第三列', '第四列'],
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "rgba(255,255,255,.1)",
                        width: 1,
                        type: "solid"
                    },
                },

                axisTick: {
                    show: false,
                },
                axisLabel: {
                    interval: 0,
                    // rotate:50,
                    show: true,
                    splitNumber: 15,
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: '12',
                    },
                },
            }],
            yAxis: [{
                type: 'value',
                axisLabel: {
                    //formatter: '{value} %'
                    show: true,
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: '12',
                    },
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "rgba(255,255,255,.1	)",
                        width: 1,
                        type: "solid"
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.1)",
                    }
                }
            }],
            series: [
                {
                    type: 'bar',
                    data: [200, 300, 300, 900],
                    barWidth: '35%', //柱子宽度
                    // barGap: 1, //柱子之间间距
                    itemStyle: {
                        normal: {
                            color: '#2f89cf',
                            opacity: 1,
                            barBorderRadius: 5,
                        }
                    }
                }

            ]
        }
        this.RowDistributionChart.setOption(option);
    },
    DataShow.prototype.refreshRowDistribution = function (no) {
        let dataAnalyze = new DataAnalyze();
        dataAnalyze.getStore(no);
        var option = this.RowDistributionChart.getOption();
        option.series[0].data = dataAnalyze.getStoreDistributionNum();
        option.xAxis[0].data = dataAnalyze.getStoreDistributionName();
        this.RowDistributionChart.setOption(option);

    },
    DataShow.prototype.initColAbnomalBinData = function (no) {
        var myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6'];
        this.ColAbnomalBinDataChart = echarts.init(document.getElementById('colabnormalbin'));
        this.ColAbnomalBinDataChart.setOption({

            grid: {
                top: '10%',
                left: '20%'
            },
            xAxis: {
                show: false
            },
            yAxis: [{
                show: true,
                data: ['超期数', '预超期', '不合格', '报警数',],
                inverse: true,
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#fff',
                    formatter: (value, index) => {
                        return [

                            `{lg|${index + 1}}  ` + '{title|' + value + '} '
                        ].join('\n')
                    },
                    rich: {
                        lg: {
                            backgroundColor: '#339911',
                            color: '#fff',
                            borderRadius: 15,
                            // padding: 5,
                            align: 'center',
                            width: 15,
                            height: 15
                        },
                    }
                },


            }, {
                show: true,
                inverse: true,
                data: [4000, 3000, 2000, 1000],
                axisLabel: {
                    textStyle: {
                        fontSize: 12,
                        color: '#fff',
                    },
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },

            }],
            series: [{
                name: '条',
                type: 'bar',
                yAxisIndex: 0,
                data: [40, 30, 20, 10],
                barWidth: 10,
                itemStyle: {
                    normal: {
                        barBorderRadius: 20,
                        color: function (params) {
                            var num = myColor.length;
                            return myColor[params.dataIndex % num]
                        },
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: '{c}%'
                    }
                },
            }, {
                name: '框',
                type: 'bar',
                yAxisIndex: 1,
                barGap: '-100%',
                data: [100, 100, 100, 100],
                barWidth: 15,
                itemStyle: {
                    normal: {
                        color: 'none',
                        borderColor: '#00c1de',
                        borderWidth: 3,
                        barBorderRadius: 15,
                    }
                }
            },]
        })
    },
    DataShow.prototype.reFreshColAbnomalBinData = function (no) {
        let dataAnalyze = new DataAnalyze();
        dataAnalyze.getGroup(no);
        var option = this.ColAbnomalBinDataChart.getOption();
        let datas = new Array();
        let occurpyBinNum=dataAnalyze.getGroupOccurpyBin();

        let datas1 = new Array();
        datas1.push(Math.round(dataAnalyze.getGroupOutOfTimeNum()*100/occurpyBinNum));
        datas1.push(Math.round(dataAnalyze.getGroupPreOutOfTimeNum()*100/occurpyBinNum));
        datas1.push(Math.round(dataAnalyze.getGroupNgNum()*100/occurpyBinNum));
        datas1.push(Math.round(dataAnalyze.getGroupAlarmNum()*100/occurpyBinNum));

        datas.push(dataAnalyze.getGroupOutOfTimeNum());
        datas.push(dataAnalyze.getGroupPreOutOfTimeNum());
        datas.push(dataAnalyze.getGroupNgNum());
        datas.push(dataAnalyze.getGroupAlarmNum());
        option.series[0].data = datas1;
        option.yAxis[1].data=datas;
        this.ColAbnomalBinDataChart.setOption(option);

    },
    DataShow.prototype.initAbnomalBinData = function () {
        var myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6'];
        this.AbnomalBinDataChart = echarts.init(document.getElementById('abnormalbin'));
        this.AbnomalBinDataChart.setOption({

            grid: {
                top: '10%',
                left: '20%'
            },
            xAxis: {
                show: false
            },
            yAxis: [{
                show: true,
                data: ['超期数', '预超期', '不合格', '报警数',],
                inverse: true,
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#fff',
                    formatter: (value, index) => {
                        return [

                            `{lg|${index + 1}}  ` + '{title|' + value + '} '
                        ].join('\n')
                    },
                    rich: {
                        lg: {
                            backgroundColor: '#339911',
                            color: '#fff',
                            borderRadius: 15,
                            // padding: 5,
                            align: 'center',
                            width: 15,
                            height: 15
                        },
                    }
                },


            },
                {
                    show: true,
                    inverse: true,
                    data: [4000, 3000, 2000, 1000],
                    axisLabel: {
                        textStyle: {
                            fontSize: 12,
                            color: '#fff',
                        },
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },

                }],
            series: [{
                name: '条',
                type: 'bar',
                yAxisIndex: 0,
                data: [40, 30, 20, 10],
                barWidth: 10,
                itemStyle: {
                    normal: {
                        barBorderRadius: 20,
                        color: function (params) {
                            var num = myColor.length;
                            return myColor[params.dataIndex % num]
                        },
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: '{c0}%'
                    }
                },
            }, {
                name: '框',
                type: 'bar',
                yAxisIndex: 1,
                barGap: '-100%',
                data: [100, 100, 100, 100],
                barWidth: 15,
                itemStyle: {
                    normal: {
                        color: 'none',
                        borderColor: '#00c1de',
                        borderWidth: 3,
                        barBorderRadius: 15,
                    }
                }
            },]
        })
    },
    DataShow.prototype.reFreshAbnomalBinData = function (no) {
        let dataAnalyze = new DataAnalyze();
        dataAnalyze.getStore(no);
        let occurpyBinNum=dataAnalyze.getStoreOccurpyBin();
        let option = this.AbnomalBinDataChart.getOption();
        let datas1 = new Array();
        let datas=new Array();
        datas1.push(Math.round(dataAnalyze.getStoreOutOfTimeNum()*100/occurpyBinNum));
        datas1.push(Math.round(dataAnalyze.getStorePreOutOfTimeNum()*100/occurpyBinNum));
        datas1.push(Math.round(dataAnalyze.getStoreNgNum()*100/occurpyBinNum));
        datas1.push(Math.round(dataAnalyze.getStoreNgNum()*100/occurpyBinNum));

        datas.push(dataAnalyze.getStoreOutOfTimeNum());
        datas.push(dataAnalyze.getStorePreOutOfTimeNum());
        datas.push(dataAnalyze.getStoreNgNum());
        datas.push(dataAnalyze.getStoreAlarmNum());
        option.series[0].data = datas1;
        option.yAxis[1].data=datas;



        this.AbnomalBinDataChart.setOption(option);
    },
    DataShow.prototype.initColTotalData = function () {
        option = {
            title: {
                text: '目前进度',
                subtext: '50%',
                x: 'center',
                y: 90,
                itemGap: 10,
                textStyle: {
                    color: '#B7E1FF',
                    fontWeight: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 24
                },
                subtextStyle: {
                    color: '#B7E1FF',
                    fontWeight: 'bolder',
                    fontSize: 24,
                    fontFamily: '微软雅黑'
                }
            },
            series: [{
                type: 'pie',
                center: ['50%', '50%'],
                radius: [75, 90],
                x: '0%',
                tooltip: {show: false},
                data: [{
                    name: '达成率',
                    value: 79,
                    itemStyle: {color: 'rgba(0,153,255,0.8)'},
                    hoverAnimation: false,
                    label: {
                        show: false,
                        position: 'center',
                        textStyle: {
                            fontFamily: '微软雅黑',
                            fontWeight: 'bolder',
                            color: '#B7E1FF',
                            fontSize: 24
                        }
                    },
                    labelLine: {
                        show: false
                    }
                },
                    {
                        name: '79%',
                        value: 21,
                        itemStyle: {color: 'rgba(0,153,255,0.1)'},
                        hoverAnimation: false,
                        label: {
                            show: false,
                            position: 'center',
                            padding: 20,
                            textStyle: {
                                fontFamily: '微软雅黑',
                                fontSize: 24,
                                color: '#B7E1FF'
                            }
                        },
                        labelLine: {
                            show: false
                        }
                    }]
            },
                {
                    type: 'pie',
                    center: ['50%', '50%'],
                    radius: [95, 100],
                    x: '0%',
                    hoverAnimation: false,
                    data: [{
                        value: 100,
                        itemStyle: {color: 'rgba(0,153,255,0.3)'},
                        label: {show: false},
                        labelLine: {show: false}
                    }]
                },
                {
                    type: 'pie',
                    center: ['50%', '50%'],
                    radius: [69, 70],
                    x: '0%',
                    hoverAnimation: false,
                    data: [{
                        value: 100,
                        itemStyle: {color: 'rgba(0,153,255,0.3)'},
                        label: {show: false},
                        labelLine: {show: false}
                    }]
                }]
        };


        this.coltotalBinNumChart = echarts.init(document.getElementById('colTotalBinNum'));
        this.colOccurpyBinNumChart = echarts.init(document.getElementById('colOccurpyBinNum'));
        option.title.text = "总库存";
        option.series[0].data[0].value = 512;
        option.title.subtext = 512;
        option.series[0].data[1].value = 0;
        this.coltotalBinNumChart.setOption(option,true);

        option.title.text = "已占库存";
        option.series[0].data[0].value = 56;
        option.title.subtext = 56;
        option.series[0].data[1].value = 100;
        this.colOccurpyBinNumChart.setOption(option,true);

    },
    DataShow.prototype.refreshGroupTotalData = function (no) {
        let dataAnalyze = new DataAnalyze();
        dataAnalyze.getGroup(no);
        var optionTotal = this.coltotalBinNumChart.getOption();
        let optionOccurpy = this.colOccurpyBinNumChart.getOption();

        optionTotal.series[0].data[0].value = dataAnalyze.getGroupTotalBin();
        optionTotal.title[0].subtext = dataAnalyze.getGroupTotalBin();
        optionTotal.series[0].data[1].value = 0;

        optionOccurpy.series[0].data[0].value = dataAnalyze.getGroupOccurpyBin();
        optionOccurpy.title[0].subtext = dataAnalyze.getGroupOccurpyBin();
        optionOccurpy.series[0].data[1].value = dataAnalyze.getGroupTotalBin()-dataAnalyze.getGroupOccurpyBin();
        this.coltotalBinNumChart.setOption(optionTotal,true);
        this.colOccurpyBinNumChart.setOption(optionOccurpy,true);
    },
    DataShow.prototype.refreshTotalData = function (no) {
        let dataAnalyze = new DataAnalyze();
        dataAnalyze.getStore(no);
        var optionTotal = this.totalBinNumChart.getOption();
        let optionOccurpy = this.occurpyBinNumChart.getOption();

        optionTotal.series[0].data[0].value = dataAnalyze.getStoreTotalBin();
        optionTotal.title[0].subtext = dataAnalyze.getStoreTotalBin();
        optionTotal.series[0].data[1].value = 0;

        optionOccurpy.series[0].data[0].value = dataAnalyze.getStoreOccurpyBin();
        optionOccurpy.title[0].subtext = dataAnalyze.getStoreOccurpyBin();
        optionOccurpy.series[0].data[1].value = dataAnalyze.getStoreTotalBin()-dataAnalyze.getStoreOccurpyBin();

        this.totalBinNumChart.setOption(optionTotal,true);
        this.occurpyBinNumChart.setOption(optionOccurpy,true);
    },
    DataShow.prototype.initTotalData = function () {
        option = {
            title: {
                text: '目前进度',
                subtext: '50%',
                x: 'center',
                y: 90,
                itemGap: 10,
                textStyle: {
                    color: '#B7E1FF',
                    fontWeight: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 24
                },
                subtextStyle: {
                    color: '#B7E1FF',
                    fontWeight: 'bolder',
                    fontSize: 24,
                    fontFamily: '微软雅黑'
                }
            },
            series: [{
                type: 'pie',
                center: ['50%', '50%'],
                radius: [75, 90],
                x: '0%',
                tooltip: {show: false},
                data: [{
                    name: '达成率',
                    value: 79,
                    itemStyle: {color: 'rgba(0,153,255,0.8)'},
                    hoverAnimation: false,
                    label: {
                        show: false,
                        position: 'center',
                        textStyle: {
                            fontFamily: '微软雅黑',
                            fontWeight: 'bolder',
                            color: '#B7E1FF',
                            fontSize: 24
                        }
                    },
                    labelLine: {
                        show: false
                    }
                },
                    {
                        name: '79%',
                        value: 21,
                        itemStyle: {color: 'rgba(0,153,255,0.1)'},
                        hoverAnimation: false,
                        label: {
                            show: false,
                            position: 'center',
                            padding: 20,
                            textStyle: {
                                fontFamily: '微软雅黑',
                                fontSize: 24,
                                color: '#B7E1FF'
                            }
                        },
                        labelLine: {
                            show: false
                        }
                    }]
            }]
        };


        this.totalBinNumChart = echarts.init(document.getElementById('totalBinNum'));
        this.occurpyBinNumChart = echarts.init(document.getElementById('occurpyBinNum'));
        option.title.text = "总库存";
        option.series[0].data[0].value = 512;
        option.title.subtext = 512;
        option.series[0].data[1].value = 0;
        this.totalBinNumChart.setOption(option,true);

        option.title.text = "已占库存";
        option.series[0].data[0].value = 56;
        option.title.subtext = 56;
        option.series[0].data[1].value = 100;
        this.occurpyBinNumChart.setOption(option,true);
    },
    DataShow.prototype.refreshStoreInOutNum = function (no) {
        let dataAnalyze = new DataAnalyze();
        dataAnalyze.getStore(no);
        let curStoreDayInNum = document.getElementById('curStoreDayInNum');
        curStoreDayInNum.innerText = dataAnalyze.getStoreInNum();
        let curStoreDayOutNum = document.getElementById('curStoreDayOutNum');
        curStoreDayOutNum.innerText = dataAnalyze.getStoreOutNum();
    },
    DataShow.prototype.refreshGroupInOutNUm = function (no) {
        let dataAnalyze = new DataAnalyze();
        dataAnalyze.getGroup(no);
        let curGroupDayInNum = document.getElementById('curGroupDayInNum');
        curGroupDayInNum.innerText = dataAnalyze.getGroupInNum();
        let curGroupDayOutNum = document.getElementById('curGroupDayOutNum');
        curGroupDayOutNum.innerText = dataAnalyze.getGroupOutNum();
    }







