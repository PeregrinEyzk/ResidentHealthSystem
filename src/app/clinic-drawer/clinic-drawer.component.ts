import { Component, OnInit } from '@angular/core';
import { addDays, formatDistance } from 'date-fns';
// import { HttpClient } from '@angular/common/http';
// import { NzMessageService } from 'ng-zorro-antd/message';
import { DrawService } from '../services/draw.service'
import { HttpClient,HttpParams, HttpHeaders} from "@angular/common/http";
@Component({
  selector: 'app-clinic-drawer',
  templateUrl: './clinic-drawer.component.html',
  styleUrls: ['./clinic-drawer.component.css']
})



export class ClinicDrawerComponent implements OnInit{
  public BasicDrawer="社区机构详情页";
  public familyDoctor="家庭医生签约";
  public clinic_title="未选中";
  public clinic_property="网络错误";
  public clinic_type="网络错误";
  public clinic_phone ="";
  public familyDoctor_phone="";
  public Association="无";
  public Groups ="暂无信息";
  public jigoujieshao="暂无信息";
  public keshixinxi="";
  public jiezhongyimiao="";
  public adress_tip="暂无公交信息";
  public clinic_adress="";
  public imgUrl="../../assets/img/hudong.png";
  public fanwei ="暂不支持接种疫苗";
  public shijian="";
  public havebed=false;
  public beds="无"

  data=[
    // {
    //   author: 'Han Solo',
    //   avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    //   star_num:4,
    //   content:
    //     'We supply a series of design principles, practical patterns and high quality design resources' +
    //     '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    //   datetime: formatDistance(new Date(), addDays(new Date(), 1))
    // }
  ];

  visible = false;
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
    var keshiInfo="";
    this.visible = true;
    var api = 'http://localhost:3000/clinic/'+this.dataServerService.getValue();
    this.http.get(api).subscribe(response => {
      this.clinic_title=response["HospName"];
      this.clinic_property=response["Kind"];
      this.clinic_type=response["OrgType"];
      this.clinic_phone =response["Phone"];
      this.familyDoctor_phone=response["FamilyDoctorPhone"];
      this.Association=response["Association"]?response["Association"]:"无",
      this.Groups =response["Groups"];
      this.jigoujieshao=response["Intro"];
      this.jiezhongyimiao="";
      this.clinic_adress=response["Address"];
      for(var i =0;i<response["departs"].length;i++){
        keshiInfo+=response["departs"][i]["DepartName"]+";";
      }
      this.adress_tip="暂无公交信息"
      this.keshixinxi=keshiInfo;
      if(response["Picture"]) this.imgUrl=response["Picture"];
      if(response["IsVaccination"]) {
        this.fanwei="按国家规定接种一类和二类疫苗";
        this.shijian=response["time"];
      }
      if(null!==response["Beds"] && 0===response["Beds"]){
        this.havebed=true;
        this.beds=response["Beds"];
      }


     });
     this.getContent(this.dataServerService.getValue())
  }
  

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


