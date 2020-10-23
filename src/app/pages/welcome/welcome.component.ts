import { Component, OnInit} from '@angular/core';
import { BaseModalContainer } from 'ng-zorro-antd';
import { HttpClient,HttpParams, HttpHeaders} from "@angular/common/http";
import { features } from 'process';
import { DrawService } from '../../services/draw.service'
import { ActivatedRoute,Router,NavigationEnd,ParamMap } from "@angular/router";
declare var BMap: any;
declare var BMapLib: any;
declare var BMAP_STATUS_SUCCESS:any;

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  providers: [DrawService],
})
export class WelcomeComponent implements OnInit {

  
  private coordx=120.628881;
  private coordy=31.312295;
  constructor(private router:Router,
    public http:HttpClient,
    public drawService:DrawService,
    private route: ActivatedRoute) 
    {
    this.http=http;
    this.drawService=drawService;
    
    
   }

  ngOnInit() {
      const center_point = new BMap.Point(120.628881,31.312295);
      //监听URL的变化情况，当URL改变时触发该函数
      this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.coordx=Number(params.get('x'))?Number(params.get('x')):120.628881;
      this.coordy=Number(params.get('y'))?Number(params.get('y')):31.312295;
      var convertor = new BMap.Convertor();
      var pointArr = [];
      var Bcenter_point = new BMap.Point(this.coordx,this.coordy);
      pointArr.push(Bcenter_point);
      convertor.translate(pointArr, 3, 5, (data)=>{
            if (data.status === 0) {
              map.centerAndZoom(data.points[0],16)
              //map.panTo(data.points[0])
            }
      pointArr.splice(0,pointArr.length)})
    });
    // this.router.events.subscribe((event: NavigationEnd) => {
    //   if (event instanceof NavigationEnd) {
    //     var convertor = new BMap.Convertor();
    //     var pointArr = [];
    //     var Bcenter_point = new BMap.Point(120.628881,31.312295);
    //     this.coordx=this.routeInfo.snapshot.queryParams["x"];
    //     this.coordy=this.routeInfo.snapshot.queryParams["y"];
    //     pointArr.push(center_point)
    //     this.router.navigate(['/map'])
    //     convertor.translate(pointArr, 3, 5, (data)=>{
    //     if (data.status === 0) {
    //       map.panTo(data.points[0])
    //     }
    //     pointArr.splice(0,pointArr.length)
    // });
    //   }
    // });
      //创建地图中心点坐标

    var f: any;
    f=this.drawService

    var yiyuan_jsonfile="../../../assets/yiyuan.json"       //加载存储在json文件中的医疗资源数据
    var clinic_jsonfile="../../../assets/clinic.json"


    const map = new BMap.Map('map', {enableMapClick:false});//创建地图实例，取消原地图的点击功能

    

    map.centerAndZoom(center_point, 14);//初始化地图，设置中心点坐标和地图级别

    map.enableScrollWheelZoom(true);//开启鼠标滚轮缩放

    var scaleCtrl = new BMap.ScaleControl();  
    map.addControl(scaleCtrl);   // 添加比例尺控件

    var navigationControl = new BMap.NavigationControl({
      // 靠左上角位置
      anchor: "BMAP_ANCHOR_TOP_LEFT",
      // LARGE类型
      type: "BMAP_NAVIGATION_CONTROL_LARGE",
      // 启用显示定位
      enableGeolocation: false
    });

    map.addControl(navigationControl);
    // 添加定位控件

    var yiyuan_markers = [];
    var zhengsuo_markers = [];

    function addmyMarker(point,myIcon,markers,mylabel,messa,kinds){
      var marker = new BMap.Marker(point,{icon:myIcon});
      var opts = {
        position : point,    // 指定文本标注所在的地理位置
        offset   : new BMap.Size(-40, 26)    //设置文本偏移量
      }
      var label = new BMap.Label(mylabel, opts);
      label.setStyle({
        background: '#fffbe6',
        border: '1px solid "#fffbe6"',
        borderRadius: "5px",
        color : "black",
        fontSize : "12px",
        textAlign: "center",
        height : "20px",
        lineHeight : "20px",
        fontFamily:"宋体",
        backgroundColor:null,
        opacity:0.6

      });
      marker.setLabel(label)    //设置文字标注
        
      markers.push(marker);
      map.addOverlay(marker);
      //map.addOverlay(label);       
      
      marker.addEventListener("click", function(e){
        f.setValue(messa);
        if("yiyuan"===kinds){     //当点击医院的图标时，弹出医院的信息窗口
          var x=<HTMLElement[]><any>document.getElementsByClassName("drawer-buttom") ;
          x[0].click(); 
        }
        else if("clinic"===kinds){  //当点击诊所的图标时，弹出诊所的信息窗口
          var x=<HTMLElement[]><any>document.getElementsByClassName("clinicdrawer-buttom") ;
          x[0].click();
        }
        else alert("Something Wrong")
      })
    }

    var hospitalIcon = new BMap.Icon("../../../assets/img/hospital.png", new BMap.Size(32,32));
    var clinicIcon = new BMap.Icon("../../../assets/img/clinic3.png", new BMap.Size(32,32));
    var userlIcon = new BMap.Icon("../../../assets/img/hospital2.png", new BMap.Size(32,32));
    var pt = null;

    this.http.get(yiyuan_jsonfile).subscribe(response => {
      var features = response["features"];
      var f_num =features.length;
      
      for(var i=0;i<f_num;i++){
        var label= features[i]["attributes"]["医院名称"].replace("姑苏区","")
        var messa = features[i]["attributes"]["ID"];
        addmyMarker(new BMap.Point(features[i]["geometry"]["x"],features[i]["geometry"]["y"]),hospitalIcon,yiyuan_markers,label,messa,"yiyuan");
      }
    })
    this.http.get(clinic_jsonfile).subscribe(response => {
      var features = response["features"];
      var f_num =features.length;
      
      for(var i=0;i<f_num;i++){
        var label= features[i]["HospName"].replace("姑苏区","")
        var messa = features[i]["ID"];
        addmyMarker(new BMap.Point(features[i]["X"],features[i]["Y"]),clinicIcon,zhengsuo_markers,label,messa,"clinic");
      }
    })
    


    var markerClusterer = new BMap.MarkerClusterer(map, {markers:yiyuan_markers});  //点聚合
    var markerClusterer2 = new BMap.MarkerClusterer(map, {markers:zhengsuo_markers});  //点聚合


    var geolocationControl = new BMap.GeolocationControl();
    geolocationControl.addEventListener("locationSuccess", function(e){
      // 定位成功事件
      var address = '';
      address += e.addressComponent.province;
      address += e.addressComponent.city;
      address += e.addressComponent.district;
      address += e.addressComponent.street;
      address += e.addressComponent.streetNumber;
      alert("当前定位地址为：" + address);
    });
    geolocationControl.addEventListener("locationError",function(e){
      // 定位失败事件
      alert(e.message);
    });


    map.addControl(geolocationControl);
    var menu = new BMap.ContextMenu();
	  var txtMenuItem = [
		{
			text:'放大',
			callback:function(){map.zoomIn()}
		},
		{
			text:'缩小',
			callback:function(){map.zoomOut()}
		}
	];
	for(var i=0; i < txtMenuItem.length; i++){
		menu.addItem(new BMap.MenuItem(txtMenuItem[i].text,txtMenuItem[i].callback,100));
	}
  map.addContextMenu(menu);
  //浏览器定位
  // var geolocation = new BMap.Geolocation();
	// geolocation.getCurrentPosition(function(r){
	// 	if(this.getStatus() ==BMAP_STATUS_SUCCESS){
  //     var mk = new BMap.Marker(r.point,{icon:userlIcon});
  //     mk.addEventListener("click", function(e){
  //       alert(e.point.lng + "," + e.point.lat)
  //     });
	// 		map.addOverlay(mk);
	// 		map.panTo(r.point);
	// 	}
	// 	else {
	// 		alert('failed'+this.getStatus());
	// 	}        
	// },{enableHighAccuracy: true})

 
	
  }
  ngAfterViewInit() { 
    
   }
}
