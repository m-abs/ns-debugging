// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";

import { MODAL_COMPONENTS } from './modal/index';

@NgModule({
  declarations: [
    AppComponent,
    ...MODAL_COMPONENTS,
  ],
  bootstrap: [
    AppComponent,
  ],
  imports: [
    NativeScriptModule,
  ],
  entryComponents: [
    ...MODAL_COMPONENTS,
  ],
})
class AppComponentModule {}

platformNativeScriptDynamic().bootstrapModule(AppComponentModule);
