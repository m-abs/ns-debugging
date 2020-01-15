import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { SecondPageRoutingModule } from './second-page-routing.module';
import { SecondPageComponent } from './second-page.component';

@NgModule({
  imports: [NativeScriptCommonModule, SecondPageRoutingModule],
  declarations: [SecondPageComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SecondPageModule {}
