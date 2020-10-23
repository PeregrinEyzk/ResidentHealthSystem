import { NgModule } from '@angular/core';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent} from './map.component';
import { HellpageComponent } from '../hellpage/hellpage.component';

@NgModule({
  declarations: [MapComponent, HellpageComponent],
  imports: [
    MapRoutingModule
  ],
  exports:[MapComponent]
})
export class MapModule { }
