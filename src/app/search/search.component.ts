import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpParams, HttpHeaders} from "@angular/common/http";
import {EventService} from '../services/event-service.service'
import {ActivatedRoute,Router} from '@angular/router';
interface Option {
  label: string;
  value: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  inputs:['nzAddOnAfter'],
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  inputValue: Option = { label:'苏州大学附属第一医院(十梓街院区)',value:'SDFY' };
  options: Option[] = [
    {label:'苏州大学附属第一医院(十梓街院区)',value:'SDFY'},
    {label:'苏州大学附属第一医院(平江总院)',value:'SDPJ'},
    {label:'苏州大学附属第二医院',value:'SDFE'},
    {label:'苏州大学附属儿童医院',value:'SZET'},
    {label:'苏州市立医院本部',value:'SLBB'},
    {label:'苏州市立医院东区',value:'SLDQ'},
    {label:'苏州市立医院北区',value:'SLBQ'},
    {label:'苏州市中医医院',value:'ZYYY'},
    {label:'苏州市第五人民医院',value:'GYYY'},
    {label:'苏州市广济医院',value:'SDFY'},
    {label:'苏州市吴中人民医院',value:'WZYY'},
    {label:'苏州市中西医结合(木渎人民)医院',value:'MDYY'},
    {label:'苏州市相城人民医院',value:'XCYY'},
    {label:'苏州科技城医院',value:'SLXQ'},
    {label:'苏州九龙医院',value:'JLYY'},
    {label:'苏州高新区人民医院',value:'FQYY'},
    {label:'苏州大学附属儿童医院(景德路院区)',value:'SZET'},
    {label:'苏州解放军100医院',value:'PLA100'}
  ];

  compareFun = (o1: Option | string, o2: Option) => {
    if (o1) {
      return typeof o1 === 'string' ? o1 === o2.label : o1.value === o2.value;
    } else {
      return false;
    }
  };

  value?: string;
  nzAddOnAfter:string

  search():void{
    var coordx=120.628881;
    var coordy=31.312295;
    var api = "http://localhost:3000/yiyuan/search/"+this.value["value"]
    this.http.get(api).subscribe(res=>{
      if(res){
        coordx=res[0]["geometry"]["coord"][0];
        coordy=res[0]["geometry"]["coord"][1];
        this.router.navigate(['/map'],{ queryParams: { x: coordx,y:coordy } });
      }
    })
    this.value=""
    
  }
  position():void{
    
  }

  constructor(private activatedRoute: ActivatedRoute,
              private router:Router,
              private event: EventService,
              public http:HttpClient
    ) {
    this.http=http;
   }


  ngOnInit(): void {

  }

}

