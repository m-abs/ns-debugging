import { Component, OnInit } from "@angular/core";
import { trigger, style, animate, state, transition } from '@angular/animations';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Item } from "./item";
import { ItemService } from "./item.service";

export function DefaultAnimations() {
  return [
    trigger('state', [
      state('fadedin', style({
        'opacity': 1,
      })),
      state('void', style({
        'opacity': 0,
      })),
      transition('void => fadedin', [
        animate('4000ms ease-out'),
      ]),
    ]),
  ];
}

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
    animations: [
      ...DefaultAnimations()
    ],
})
export class ItemsComponent implements OnInit {
    public readonly show = new BehaviorSubject<boolean>(false);
    items: Item[];

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }
}
