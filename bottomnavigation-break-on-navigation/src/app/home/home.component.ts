import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import { DataItem, DataService } from '../shared/data.service';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  items: Array<DataItem>;

  constructor(private _itemService: DataService, private routerext: RouterExtensions) {}

  ngOnInit(): void {
    this.items = this._itemService.getItems();
  }

  toSecondPage() {
    this.routerext
      .navigate(['/second-page/default'], {})
      .then((done) => console.log({ done }))
      .catch((err) => console.error(err));
  }
}
