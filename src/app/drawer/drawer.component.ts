import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit{
  public BasicDrawer="门诊详情页";
  public hospital="苏州大学附属第二医院";
  public hospital_class="三级甲等";
  public hos_adress="科锐路一号"
  public yiyuanjieshao="niaho"
  public imgUrl="../../assets/img/hudong.png"
  public yiyuankeshi=""
  public keshichuangwei=""




  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  constructor() { }

  ngOnInit() {
  }
  

}
