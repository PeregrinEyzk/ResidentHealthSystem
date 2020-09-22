import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hellpage',
  templateUrl: './hellpage.component.html',
  styleUrls: ['./hellpage.component.css']
})
export class HellpageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit():void {
    const menu = document.querySelector('#toggle');  
    const menuItems = document.querySelector('#overlay');  
    const menuContainer = document.querySelector('.menu-container');  
    const menuIcon = document.querySelector('i');  

    function toggleMenu(e) {
      menuItems.classList.toggle('open');
      menuContainer.classList.toggle('full-menu');   //给该dom元素添加full-menu类
      menuIcon.classList.toggle('fa-bars');
      menuIcon.classList.add('fa-times');
      e.preventDefault();
}

    menu.addEventListener('click', toggleMenu, false);
    }
}
