// libs
import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { RouterExtensions } from 'nativescript-angular';
import { BehaviorSubject } from 'rxjs';

declare var NSIndexPath, UITableViewScrollPosition;

export interface ListViewItem {
  title: string;
  currentSegment?: boolean;
}

let itemInstanceNo = 0;
@Component({
  selector: 'sd-home-item',
  template: `
    <StackLayout [class.odd]="odd" [class.even]="even">
      <GridLayout columns="*, 20" class="list-group-item" [class.c-bg-grey]="item.currentSegment">
        <Label class="list-group-item-text" [text]="item.title" col="0" [colSpan]="item.currentSegment ? 1 : 2"></Label>
        <Image *ngIf="item.currentSegment" src="res://now_playing" col="1"></Image>
      </GridLayout>
    </StackLayout>
  `
})
export class HomeItemComponent implements OnInit, OnDestroy {
  private instanceNo = ++itemInstanceNo;
  @Input() item: ListViewItem;
  @Input() odd: boolean;
  @Input() even: boolean;

  ngOnInit() {
    console.log(`HomeItemComponent<${this.instanceNo}>.ngOnInit()`);
  }

  ngOnDestroy() {
    console.log(`HomeItemComponent<${this.instanceNo}>.ngOnDestroy()`);
  }
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

  listViewLoaded(event: any) {
    console.log(event.object);
  }
}
