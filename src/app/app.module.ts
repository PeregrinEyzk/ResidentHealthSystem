import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { MapComponent } from './map/map.component';
import { MapModule } from './map/map.module';
import { SearchComponent } from './search/search.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { DrawerComponent } from './drawer/drawer.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { WeatherComponent } from './weather/weather.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { DrawService } from './services/draw.service';
import {EventService} from './services/event-service.service'
import { ClinicDrawerComponent } from './clinic-drawer/clinic-drawer.component';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { DiseaseComponent } from './disease/disease.component';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    DrawerComponent,
    WeatherComponent,
    ClinicDrawerComponent,
    DiseaseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MapModule,
    NzInputModule,
    NzButtonModule,
    NzDrawerModule,
    NzTypographyModule,
    NzDividerModule,
    NzGridModule,
    NzIconModule,
    NzTabsModule,
    NzCommentModule,
    NzListModule,
    NzAvatarModule,
    NzPaginationModule,
    NzRateModule,NzToolTipModule,NzTagModule,NzAutocompleteModule
  ],
  providers: [{ provide: [NZ_I18N], useValue: zh_CN},EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
