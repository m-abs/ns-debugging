// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AboutComponent } from './about/about.component';
import { HomeComponent, HomeItemComponent } from './home/home.component';
import { AppRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    HomeItemComponent,
  ],
  bootstrap: [
    AppComponent,
  ],
  imports: [
    NativeScriptModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(AppRoutes),
  ],
})
class AppComponentModule {}

platformNativeScriptDynamic().bootstrapModule(AppComponentModule);
