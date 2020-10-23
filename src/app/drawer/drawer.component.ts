import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { NzMessageService } from 'ng-zorro-antd/message';
import { DrawService } from '../services/draw.service'
import { HttpClient,HttpParams, HttpHeaders} from "@angular/common/http";
var keshibeds=[];
var yiyuan_url="";
var warninglevel={
  1:"充足",
  2:"少量",
  3:"紧缺"
}
var tagcolor={
  1:'#87d068',
  2:'#108ee9',
  3:'#f50'
}
@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit{
  public BasicDrawer="门诊详情页";
  public yiyuan_title="未选中";
  public yiyuan_xingzhi="公立";
  public yiyuan_dengji="三级";
  public yiyuan_leibie="甲级";
  public yiyuan_phone="22055511";
  public yiyuan_phone2="4455114";
  public hos_adress="科锐路一号";
  public yiyuanjieshao="niaho";
  public imgUrl="../../assets/img/hudong.png";
  public yiyuankeshi="";
  public keshichuangwei="";
  public gongjiaotip="";




  visible = false;

  data = [];

  getContent= function(name){
    this.data=[];
    var Capi = 'http://localhost:3000/content/'+name;
    this.http.get(Capi).subscribe(res => {
      if(res){
        this.data=[{
          author: res[0]["author"],
          avatar: res[0]["avatar"],
          star_num:res[0]["star_num"],
          content:res[0]["content"],
          datetime:res[0]["datetime"].substring(0,10)}]
        // this.data[0]["author"]=res[0]["author"];
        // this.data[0]["avatar"]=res[0]["avatar"];
        // this.data[0]["star_num"]=res[0]["star_num"];
        // this.data[0]["content"]=res[0]["content"];
        // this.data[0]["datetime"]=res[0]["datetime"].substring(0,10);
        for(var i=1;i<res.length;i++){
          var content={
            author: res[i]["author"],
            avatar: res[i]["avatar"],
            star_num:res[i]["star_num"],
            content:res[i]["content"],
            datetime:res[i]["datetime"].substring(0,10)
          }
          this.data.push(content)
        }
      }
    })
  }
  open(): void {
    this.yiyuan_dengji=this.dataServerService.getValue();
    this.visible = true;
    var api = 'http://localhost:3000/yiyuan/'+this.dataServerService.getValue();
    this.http.get(api).subscribe(response => {
        this.yiyuan_title= response["HospName"];
        this.imgUrl=response["img_url"]
        this.yiyuan_dengji=response["Grade"];
        this.yiyuan_leibie=response["Kind"];
        this.yiyuan_phone=response["Phone"];
        this.yiyuan_phone2=response["RequestPhone"];
        this.gongjiaotip=response["Way"];
        this.hos_adress=response["Address"];
        this.yiyuanjieshao=response["Intro"];
        var keshi=response["departs"];
        var keshiValue=""
        for(var i =0;i<keshi.length;i++){
          keshiValue+=keshi[i]+";";
        }
        this.yiyuankeshi=keshiValue;
        var bedsinfo=response["beds"];
        for(var m =0;m<bedsinfo.length;m++){
          keshibeds.push({keshi:bedsinfo[m]["ResName"],num:warninglevel[bedsinfo[m]["WarnningLevel"]],tip:bedsinfo[m]["DepartIntro"].substring(0,100),tagColor:tagcolor[bedsinfo[m]["WarnningLevel"]]})}
     });
      this.getContent(this.dataServerService.getValue())
  }
  public beds=keshibeds;

  close(): void {
    this.visible = false;
  }


  



  constructor(private dataServerService:DrawService,public http:HttpClient) {
    this.http=http;
   }

  ngOnInit() {
  }
  ngAfterViewInit(){
    
  }

}
