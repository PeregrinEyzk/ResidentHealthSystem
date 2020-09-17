import { NgModule } from '@angular/core';

import { MapRoutingModule } from './map-routing.module';
import {MapComponent} from './map.component';

@NgModule({
  declarations: [MapComponent],
  imports: [
    MapRoutingModule
  ],
  exports:[MapComponent]
})
export class MapModule { }
