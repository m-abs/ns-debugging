import { Component } from "@angular/core";
import { Page } from 'tns-core-modules/ui/page';
import { topmost } from 'tns-core-modules/ui/frame';

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent {
  constructor(page: Page) {
    console.log(page);
    console.log(topmost().currentPage);
    console.log(page === topmost().currentPage);
  }
}
