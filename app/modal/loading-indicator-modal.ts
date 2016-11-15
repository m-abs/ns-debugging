import { Component, AnimationTransitionEvent, ChangeDetectorRef } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

import { BaseModal, AnimationModalFadeIn } from './base-modal';

import { Page } from 'ui/page';

@Component({
  moduleId: module.id,
  selector: 'modal-content',
  template: `
  <StackLayout class="modal-box">
    <StackLayout class="p-5 modal-content" backgroundColor="white" [@state]="transState" (@state.done)="animationDone($event)" [class.android]="isAndroid" [class.ios]="isIOS">
      <StackLayout [class.android]="isAndroid" [class.ios]="isIOS" class="spinner-box">
        <ActivityIndicator class="m-x-5" busy="true"></ActivityIndicator>

        <Label class="m-x-5" [class.text-center]="isIOS" [text]="title"></Label>
      </StackLayout>

      <Label
        *ngIf="cancellable"
        class="btn btn-cancel"
        [class.text-right]="isAndroid"
        [class.text-uppercase]="isAndroid"
        [class.text-center]="isIOS"
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
    ...AnimationModalFadeIn(),
  ],
  styleUrls: [
    'loading-indicator-modal.css'
  ]
})
export class LoadingIndicatorModal extends BaseModal {
  cancellable: boolean;

  constructor(protected params: ModalDialogParams, public page: Page) {
    super(params, page);

    console.log(`LoadingIndicatorModal -> ${this.title}`);

    this.cancellable = !!params.context.cancellable;
  }
}

