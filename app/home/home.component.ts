// libs
import { Component, OnInit, Input } from "@angular/core";
import { RouterExtensions } from 'nativescript-angular';
import { BehaviorSubject } from 'rxjs';

declare var NSIndexPath, UITableViewScrollPosition;

export interface ListViewItem {
  title: string;
  currentSegment?: boolean;
}

@Component({
  selector: 'item-component',
  template: `
    <StackLayout [class.odd]="odd" [class.even]="even" (loaded)="loaded($event)" (unloaded)="unloaded($event)">
      <GridLayout columns="20, *" class="list-group-item" [class.c-bg-grey]="item.currentSegment" (loaded)="loaded($event)" (unloaded)="unloaded($event)">
        <Label class="list-group-item-text" [text]="item.title" col="0" [colSpan]="item.currentSegment ? 1 : 2" (loaded)="loaded($event)" (unloaded)="unloaded($event)"></Label>
        <Image *ngIf="item.currentSegment" src="res://now_playing" col="1" (loaded)="loaded($event)" (unloaded)="unloaded($event)"></Image>
      </GridLayout>
    </StackLayout>
  `
})
export class ItemComponent {
  @Input() item: ListViewItem;
  @Input() odd: boolean;
  @Input() even: boolean;

  loaded(event: any) {
    console.log('LOADED');
    for (const key of Object.keys(event)) {
      console.log(`${key} = ${event[key]}`);
    }
    console.log('END - LOADED');
  }

  unloaded(event: any) {
    console.log('UNLOADED');
    for (const key of Object.keys(event)) {
      console.log(`${key} = ${event[key]}`);
    }
    console.log('END - UNLOADED');
  }
};

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

  loaded(event: any) {
    console.log('LOADED');
    for (const key of Object.keys(event)) {
      console.log(`${key} = ${event[key]}`);
    }
    console.log('END - LOADED');
  }

  unloaded(event: any) {
    console.log('UNLOADED');
    for (const key of Object.keys(event)) {
      console.log(`${key} = ${event[key]}`);
    }
    console.log('END - UNLOADED');
  }
}
