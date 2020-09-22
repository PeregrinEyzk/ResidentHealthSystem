import { Component, OnInit} from '@angular/core';
import { BaseModalContainer } from 'ng-zorro-antd';
declare var BMap: any;
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const map = new BMap.Map('map');//创建地图实例
    const point = new BMap.Point(120.628892,31.312598);//创建点坐标
    map.centerAndZoom(point, 14);//初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true);//开启鼠标滚轮缩放
    var scaleCtrl = new BMap.ScaleControl();  // 添加比例尺控件
    map.addControl(scaleCtrl);
    var navigationControl = new BMap.NavigationControl({
      // 靠左上角位置
      anchor: "BMAP_ANCHOR_TOP_LEFT",
      // LARGE类型
      type: "BMAP_NAVIGATION_CONTROL_LARGE",
      // 启用显示定位
      enableGeolocation: true
    });
    map.addControl(navigationControl);
    // 添加定位控件


    function addMarker(point){
      var marker = new BMap.Marker(point);
      map.addOverlay(marker);
      marker.addEventListener("click", function(e){
        var x=<HTMLElement[]><any>document.getElementsByClassName("drawer-buttom") ;   
        x[0].click();
      })
    }
    var markpoint = new BMap.Point(120.62783600,31.30780100); 
    addMarker(markpoint);
    
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

    // 编写自定义函数,创建标注
	
  }
  
}
