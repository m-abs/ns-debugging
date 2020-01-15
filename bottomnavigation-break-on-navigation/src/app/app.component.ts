import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ns-app',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  constructor(router: Router) {
    // Use the component constructor to inject providers.
    router.events.subscribe((evt) => console.log(`${evt}`));
  }

  ngOnInit(): void {
    // Init your component properties here.
  }
}
