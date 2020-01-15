import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { SecondPageComponent } from './second-page.component';

const routes: Routes = [{ path: 'default', component: SecondPageComponent }];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class SecondPageRoutingModule {}
