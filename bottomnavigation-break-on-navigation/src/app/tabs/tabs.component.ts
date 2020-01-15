import { Component, OnInit } from '@angular/core';
import { Page } from '@nativescript/core/ui/page/page';

@Component({
  selector: 'ns-tabs',
  templateUrl: 'tabs.component.html',
})
export class TabsComponent implements OnInit {
  constructor(private page: Page) {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Init your component properties here.
    this.page.actionBarHidden = true;
  }
}
