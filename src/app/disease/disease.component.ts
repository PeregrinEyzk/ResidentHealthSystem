import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpParams, HttpHeaders} from "@angular/common/http";
declare var BMap: any;
var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
var PI = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;

@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['./disease.component.css']
})



export class DiseaseComponent implements OnInit {
  public dmap:any;
  clicked = false;
  showDisease():void{
    this.clicked=true;
    var api ="http://localhost:3000/patient/find"
    this.http.get(api).subscribe(res=>{
      if(res!==[]){
        var data:any=res;
        var patient_coord=[];
        for(var num=0;num<data.length;num++){
          var coord = data[num]["patient_geo"];
          var patient_point = new BMap.Point(coord["coordinates"][0],coord["coordinates"][1])
          var patient_marker = new BMap.Marker(patient_point)
          this.dmap.addOverlay(patient_marker);
        }
        console.log(patient_coord[0]["coordinates"])
        }
      });
  }


  removeOverlayer():void{
    this.clicked = false;
    this.dmap.clearOverlays();
  }


  constructor(public http:HttpClient) { 
    this.http=http;
  }

  ngOnInit(): void {
    function gcj02tobd09(lng, lat) {
      var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
      var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
      var bd_lng = z * Math.cos(theta) + 0.0065;
      var bd_lat = z * Math.sin(theta) + 0.006;
      return [bd_lng, bd_lat]
  }
  
  /**
   * WGS84转GCj02
   * @param lng
   * @param lat
   * @returns {*[]}
   */
  function wgs84tobd02(lng, lat) {
      if (out_of_china(lng, lat)) {
          return [lng, lat]
      }
      else {
          var dlat = transformlat(lng - 105.0, lat - 35.0);
          var dlng = transformlng(lng - 105.0, lat - 35.0);
          var radlat = lat / 180.0 * PI;
          var magic = Math.sin(radlat);
          magic = 1 - ee * magic * magic;
          var sqrtmagic = Math.sqrt(magic);
          dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
          dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
          var mglat = lat + dlat;
          var mglng = lng + dlng;
          return gcj02tobd09(mglat,mglng)
      }
  }
  function transformlat(lng, lat) {
    var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
    return ret
}

function transformlng(lng, lat) {
    var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
    return ret
}

function getdata(data){
  var diseasePoint=[];
  return new Promise(function(resolve,reject){
    for(var i=0;i<data.length;i++){
      var dbpoint=wgs84tobd02(data[i]["patient_geo"]["coordinates"][0],data[i]["patient_geo"]["coordinates"][1])
      var point = new BMap.Point(dbpoint[0],dbpoint[1]);
      var marker = new BMap.Marker(point)
      diseasePoint.push(marker);
    }
    resolve(diseasePoint);
  })
}
// function addmarker(dbpoint:Array<Number>){
//   return new Promise(function(resolve,reject){
//     var point = new BMap.Point(dbpoint[0],dbpoint[1]);
//     var marker = new BMap.Marker(point);
//     dmap.addOverlay(marker);
//   })

// }

/**
 * 判断是否在国内，不在国内则不做偏移
 * @param lng
 * @param lat
 * @returns {boolean}
 */
function out_of_china(lng, lat) {
    return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
}
    const center_point = new BMap.Point(120.628881,31.312295);
    this.dmap = new BMap.Map('dmap', {enableMapClick:false});
    this.dmap.centerAndZoom(center_point, 14);//初始化地图，设置中心点坐标和地图级别

    this.dmap.enableScrollWheelZoom(true);//开启鼠标滚轮缩放

    var scaleCtrl = new BMap.ScaleControl();  
    this.dmap.addControl(scaleCtrl);   // 添加比例尺控件

    var navigationControl = new BMap.NavigationControl({
      // 靠左上角位置
      anchor: "BMAP_ANCHOR_TOP_LEFT",
      // LARGE类型
      type: "BMAP_NAVIGATION_CONTROL_LARGE",
      // 启用显示定位
      enableGeolocation: false
    });
    this.dmap.addControl(navigationControl);

    // var convertor = new BMap.Convertor();
    // var api ="http://localhost:3000/patient/find"
    // this.http.get(api).subscribe(res=>{
    //   var data:any=res;
    //   var actions=[];
    //   if(res){
    //     getdata(data).then(function(returnValue){
    //       var value:any=returnValue;
    //       for(var n=0;n<value.length;n++){
    //         dmap.addOverlay(value[n]);
    //       }
    //     })
      
    // function translate(){
    //     convertor.translate(patientPoint, 3, 5, (data)=>{
    //       if (data.status === 0) {
    //         for(var n=0;n<data.points.length;n++){
    //           var marker = new BMap.Marker(data.points[n])
    //           dmap.addOverlay(marker);
    //         }
    //       }
    //   }) 
    // }
    // }
    // });

  }

}
