import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { TabsRoutingModule } from './tabs-routing.module';
import { TabsComponent } from './tabs.component';

@NgModule({
  imports: [NativeScriptCommonModule, TabsRoutingModule],
  declarations: [TabsComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class TabsModule {}
