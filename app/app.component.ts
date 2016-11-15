import { Component, ViewContainerRef } from "@angular/core";

import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { LoadingIndicatorModal } from './modal/index';

@Component({
  selector: "my-app",
  templateUrl: "app.component.html",
})
export class AppComponent {
  public counter: number = 16;

  constructor(private viewContainerRef: ViewContainerRef, private modal: ModalDialogService) {}

  public get message(): string {
    if (this.counter > 0) {
      return this.counter + " taps left";
    } else {
      return "Hoorraaay! \nYou are ready to start building!";
    }
  }

  public onTap() {
    this.counter--;

    this.modal.showModal(LoadingIndicatorModal, {
      context: {
        title: 'loading',
        cancellable: true,
        cancelButtonText: 'cancel',
        setCloseCallback(cb) {
          // setTimeout(cb, 2000);
        },
      },
      fullscreen: true,
      viewContainerRef: this.viewContainerRef,
    }).then((res) => {
      console.log(res);
    });
  }
}
