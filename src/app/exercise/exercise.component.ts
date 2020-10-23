import { Component, OnInit } from '@angular/core';
import Circle from 'ol/geom/Circle';
import * as proj from 'ol/proj'
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import View from 'ol/View';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {OSM, Vector as VectorSource,XYZ} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer,layer} from 'ol/layer';
import {Control, defaults as defaultControls} from 'ol/control';
import { HttpClient,HttpParams, HttpHeaders} from "@angular/common/http";
import LineString from 'ol/geom/LineString';
import MultiLineString from 'ol/geom/MultiLineString';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  public map:any;
  goCovid19():void{
    window.open('http://localhost:3000/covid19');
  }
  searchRoads():void{
    var lineString;
    var roadsname=window.prompt("请输入要查找的道路名","石板街");
    var api = "http://localhost:3000/roadsfind/"+roadsname;
    this.http.get(api).subscribe(res=>{
      var response :any=res;
        if(response.length>0){
          lineString=res[0]["geometry"]["coordinates"];
          console.log(lineString)
          var geomPolyline= new MultiLineString(lineString)
          geomPolyline.transform("EPSG:4326","EPSG:3857");
          var featurepolyline = new Feature({
            geometry: geomPolyline,
            name: 'My Polyline'
        });
        var polylineVectorSource = new VectorLayer({
          features:[featurepolyline]
      });
      alert()
      this.map.addLayer(polylineVectorSource);

        }
        else alert("数据库未返回数据")
    })
  }


  constructor(private http:HttpClient) {
      this.http=http;
   }

  ngOnInit(): void {
    
    var vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(require('../../assets/roads_3857.json')),  //使用require引入geojson格式数据，并且要将.geojson改名为.json否则会报错
    });

    var center = proj.transform([120.625148,31.310499], "EPSG:4326", "EPSG:3857");
    this.map = new Map({
        target: 'olmap',
        controls: defaultControls({
          attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
            collapsible: false
          }),
          //清除地图上默认样式（放大、缩小、旋转按钮等）
          attribution: false,
          rotate: false,
          zoom: false
        }),
        layers: [
                new TileLayer({
                  source: new XYZ({
                    url: 'https://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=1282f54505a2bb47462b625756d0bb97',
                  }),
                  isGroup: true,
                  name: '天地图路网'
                }),
                new VectorLayer({
                  source: vectorSource,
                }),//注意添加顺序，确保标注图层在矢量图层之上
                new TileLayer({
                  source: new XYZ({
                    url: 'https://t0.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=1282f54505a2bb47462b625756d0bb97'
                  }),
                  isGroup: true,
                  name: '天地图文字标注'
                })
            ],

        view: new View({
          center: center,
          zoom: 14
        })
    });
   }
}
