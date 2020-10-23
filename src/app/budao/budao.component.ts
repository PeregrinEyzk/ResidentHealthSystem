import { Component, OnInit } from '@angular/core';

import ImageLayer from 'ol/layer/Image';
import Map from 'ol/Map';
import Projection from 'ol/proj/Projection';
import Static from 'ol/source/ImageStatic';
import View from 'ol/View';
import {getCenter} from 'ol/extent';
import {Control, defaults as defaultControls} from 'ol/control';
@Component({
  selector: 'app-budao',
  templateUrl: './budao.component.html',
  styleUrls: ['./budao.component.css']
})
export class BudaoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    var extent = [0, 0, 3390, 4218];
var projection = new Projection({
  code: 'xkcd-image',
  units: 'pixels',
  extent: extent,
});

var map = new Map({
  layers: [
    new ImageLayer({
      source: new Static({
        url: '../../assets/img/budao.png',
        //'https://imgs.xkcd.com/comics/online_communities.png',
        projection: projection,
        imageExtent: extent,
      }),
    }) ],
  target: 'Budaomap',
  controls: defaultControls({
    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
      collapsible: false
    }),
    //清除地图上默认样式（放大、缩小、旋转按钮等）
    attribution: false,
    rotate: false,
    zoom: false
  }),
  view: new View({
    projection: projection,
    center: getCenter(extent),
    zoom: 2,
    maxZoom: 8,
  }),
});
  }

}
