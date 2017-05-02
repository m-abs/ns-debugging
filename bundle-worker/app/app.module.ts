import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

import { ItemService } from "./item/item.service";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        ItemsComponent,
        ItemDetailComponent
    ],
    providers: [
        ItemService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }

let mabsworker: Worker;
if (global.TNS_WEBPACK) {
  const MyWorker = require('worker-loader!./worker');
  mabsworker = new MyWorker();
} else {
  mabsworker = new Worker('./worker');
}

mabsworker.postMessage({a: 1});
mabsworker.onmessage = function(arg) {
  console.dump(arg);
};

mabsworker.onerror = function(arg) {
  console.dump(arg);
  return true;
};
