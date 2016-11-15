/**
 * Presents a modal dialog where the user can pick one of a supplied list of strings.
 * Returns the index of the string picked.
 *
 * How to use:

Annotate like this in host component:
  <StackLayout>

Then call nativescript modal service with name of this class:
  this.modalService.showModal(ActionPickerModal, {
    context: {
      options: actionItems,
      setCloseCallback(fn) {...}
    },
    fullscreen: true,
  }).then((index) => {
    console.log('Received index: '+ index);
  });
 */

import { Component, AnimationTransitionEvent, ChangeDetectorRef } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

import { BaseModal, AnimationModalSlideUp } from './base-modal';

import { ActionPickerOptions } from './/action-picker-types';

import { Page } from 'ui/page';

@Component({
  selector: 'modal-content',
  template: `
  <StackLayout class="modal-box">
    <StackLayout class="p-5" backgroundColor="white" [@state]="transState" (@state.done)="animationDone($event)">
      <Label class="h2" [text]="title"></Label>

      <ListView [items]="options" (itemTap)="onItemTap($event)" row="0" col="0" [rowHeight]="rowHeight" [height]="options.length * rowHeight" class="list-group">
        <template let-item="item">
          <GridLayout class="list-group-item" columns="30, *, auto" rows="30" verticalAlignment="center">
            <Image col="0" *ngIf="item.icon" [src]="item.icon" class="m-y-2"></Image>
            <Label col="1" [text]="item.label" verticalAlignment="center"></Label>
            <Image col="2" *ngIf="item.selected" src="res://check"></Image>
          </GridLayout>
        </template>
      </ListView>

      <Label
        class="btn btn-cancel"
        [class.text-right]="isAndroid"
        [class.text-uppercase]="isAndroid"
        [class.text-center]="!isAndroid"
        [text]="cancelButtonText"
        (tap)="cancel()"

        accessible="true"
        accessibilityComponentType="button"
        accessibilityTraits="button"
      ></Label>
    </StackLayout>
  </StackLayout>
  `,
  animations: [
    ...AnimationModalSlideUp(),
  ],
  styles: [
    `
    .modal-box {
      vertical-align: bottom;
      background-color: transparent;
    }

    .btn-cancel {
      width: 100%;
    }
    `
  ]
})
export class ActionPickerModal extends BaseModal {
  public options: ActionPickerOptions = [];

  public readonly rowHeight = 30 + 10 * 2;

  constructor(protected params: ModalDialogParams, public page: Page, public cdr: ChangeDetectorRef) {
    super(params, page);

    for (let {icon, label, selected, selectable, ios, android}  of <ActionPickerOptions>params.context.options) {
      if (this.isAndroid) {
        if (android && android.icon) {
          icon = android.icon;
        }
      } else if (this.isIOS) {
        if (ios && ios.icon) {
          icon = ios.icon;
        }
      }

      this.options.push({
        icon,
        label,
        selected: !!selected,
        selectable: !!selectable,
      });
    }
  }

  onItemTap(event: any) {
    const item = this.options[event.index];
    console.log(JSON.stringify(item));
    if (item.selectable) {
      for (const t of this.options) {
        t.selected = false;
      }

      item.selected = true;

      this.options = [...this.options];

      this.cdr.markForCheck();
    }

    this.res = event.index;
    this.transState = 'out';
  }
}
