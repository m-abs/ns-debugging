// libs
import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from 'nativescript-angular';
import { BehaviorSubject } from 'rxjs';

declare var NSIndexPath, UITableViewScrollPosition;

export interface ListViewItem {
  title: string;
  currentSegment?: boolean;
}

@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private items = new BehaviorSubject<ListViewItem[]>(null);

  constructor(public routerext: RouterExtensions) {
  }

  readAbout() {
    // Try this in the {N} app
    // {N} can use these animation options
    this.routerext.navigate(['/about'], {
      transition: {
        duration: 1000,
        name: 'slideTop',
      }
    });
  }

  ngOnInit() {
    const items: ListViewItem[] = [
      {
        'title': 'Bunker 137',
      }, {
        'title': 'Gangsta rap',
      }, {
        'title': 'Se',
        'currentSegment': true,
      }, {
        'title': 'Grantræet',
      }, {
        'title': 'Nørkel Nissegård Emmanuel Tilfreds',
      }, {
        'title': 'Gravrøverne',
      }, {
        'title': 'Drømmerens datter',
      }, {
        'title': 'Skyggeforbandelsen',
      }];

    this.items.next(items);
  }
}
