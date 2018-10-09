import "nativescript-angular/zone-js/testing.jasmine";
import {
  nsTestBedInit,
  nsTestBedBeforeEach,
  nsTestBedAfterEach,
  nsTestBedRender
} from "nativescript-angular/testing";
import { ItemDetailComponent } from "~/app/item/item-detail.component";
import { async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ComponentRef } from "@angular/core";
import { ItemService } from "~/app/item/item.service";
import { NativeScriptRouterModule } from "nativescript-angular/router";
nsTestBedInit();

describe("ItemDetailComponent", () => {
  beforeEach(nsTestBedBeforeEach([ItemDetailComponent], [ItemService], [RouterTestingModule.withRoutes([]), NativeScriptRouterModule.forRoot([])]));
  afterEach(nsTestBedAfterEach(false));

  it('Component should exist', async(() => {
    return nsTestBedRender(ItemDetailComponent).then((fixture) => {
      const componentRef: ComponentRef<ItemDetailComponent> = fixture.componentRef;
      if (!(componentRef.instance instanceof ItemDetailComponent)) {
        throw new Error('ItemDetailComponent Not Loaded');
      }
    });
  }));
});
