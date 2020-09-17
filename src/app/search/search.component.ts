import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  inputs:['nzAddOnAfter'],
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  nzAddOnAfter:string
  constructor() { }

  ngOnInit(): void {
  }

}
