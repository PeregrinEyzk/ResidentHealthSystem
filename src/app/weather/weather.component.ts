import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpParams, HttpHeaders} from "@angular/common/http";



// declare var $: any;
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  public weatherImg="../../assets/weatherImg/icon/sunny.png";
  public tianqi="未获取到数据";
  //public waichu="";
  public chengshi="suzhou";
  public waichutip="抱歉，网络错误"
  public kongqizhiliang=""
  public yundong="";
  public tem0="";   //最低温度
  public tem1="";   //最高温度
  constructor(public http:HttpClient) {
    this.http=http;
   }
   makeGet():void{
     
    var api = 'https://www.tianqiapi.com/api/?version=v9&appid=16979719&appsecret=sVvX3AQP&city=苏州'
    this.http.get(api).subscribe(response => {
        this.chengshi=response["city"];
        //this.waichu=response["aqi"]["waichu"];
        this.waichutip=response["aqi"]["air_tips"]+"\t更新时间："+response["update_time"];
        this.kongqizhiliang=response["aqi"]["air_level"];
        this.tianqi=response["data"][0]["wea"];
        this.yundong=response["aqi"]["yundong"];
        this.tem0=response["data"][0]["tem2"];
        this.tem1=response["data"][0]["tem1"];
        if("多云"===this.tianqi) this.weatherImg="../../assets/weatherImg/icon/clear.png";
        else if("晴"===this.tianqi) this.weatherImg="../../assets/weatherImg/icon/sunny.png";
        else if("雨"===this.tianqi) this.weatherImg="../../assets/weatherImg/icon/rainy.png";
        else if("雪"===this.tianqi) this.weatherImg="../../assets/weatherImg/icon/rainy.png";
        else if("阴"===this.tianqi) this.weatherImg="../../assets/weatherImg/icon/cloudy.png";    
        else if("中雨"===this.tianqi) this.weatherImg="../../assets/weatherImg/icon/rainyb.png";
        else if("大雨"===this.tianqi) this.weatherImg="../../assets/weatherImg/icon/bbrainy.png";
        else if("雨夹雪"===this.tianqi) this.weatherImg="../../assets/weatherImg/icon/bgrainy.png";
        else this.weatherImg="../../assets/weatherImg/icon/notfound.png"
        console.log( response);
     });}
    ngOnInit(): void {
      this.makeGet();
      setInterval(this.makeGet,1000*60*30);//每半个小时重新获取一次数据
  }
}
