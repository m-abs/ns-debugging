import { trigger, style, animate, state, transition, AnimationTransitionEvent } from '@angular/core';

import { isAndroid, isIOS } from 'platform';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { Page } from 'ui/page';
const pageCommon = require('ui/page/page-common').Page;
import { Color } from 'color';
import * as utils from 'utils/utils';

export class BaseModal {
  public title: string;
  public res: string | number;
  public transState: 'in' | 'out' = 'in';
  public cancelButtonText: string;

  public isAndroid = isAndroid;
  public isIOS = isIOS;

  constructor(protected params: ModalDialogParams, public page: Page) {
    if (page.ios) {
      // iOS by default won't let us have a transparent background on a modal
      // Ugly workaround from: https://github.com/NativeScript/nativescript/issues/2086#issuecomment-221956483
      page.backgroundColor = new Color(50, 0, 0, 0);

      (<any>page)._showNativeModalView = function(parent, context, closeCallback, fullscreen) {
        pageCommon.prototype._showNativeModalView.call(this, parent, context, closeCallback, fullscreen);
        let that = this;

        this._modalParent = parent;
        if (!parent.ios.view.window) {
            throw new Error("Parent page is not part of the window hierarchy. Close the current modal page before showing another one!");
        }

        if (fullscreen) {
          this._ios.modalPresentationStyle = 0;
        }
        else {
          this._ios.modalPresentationStyle = 2;
          this._UIModalPresentationFormSheet = true;
        }

        pageCommon.prototype._raiseShowingModallyEvent.call(this);

        this._ios.providesPresentationContextTransitionStyle = true;
        this._ios.definesPresentationContext = true;
        this._ios.modalPresentationStyle = UIModalPresentationOverFullScreen;
        this._ios.view.backgroundColor = UIColor.clearColor;

        parent.ios.presentViewControllerAnimatedCompletion(this._ios, utils.ios.MajorVersion >= 9, function completion() {
          that._ios.modalPresentationStyle = UIModalPresentationCurrentContext;
          that._raiseShownModallyEvent(parent, context, closeCallback);
        });
      }
    }

    if (!('setCloseCallback' in params.context)) {
      throw new Error('setCloseCallback is required as a context parameter for modal-views');
    }

    params.context.setCloseCallback(() => {
      this.cancel();
      page.closeModal();
    });

    this.title = params.context.title;
    this.cancelButtonText = params.context.cancelButtonText;
  }

  protected cancel() {
    this.res = 'cancel';
    this.transState = 'out';
  }

  animationDone(event: AnimationTransitionEvent) {
    if (event.toState === 'out') {
      this.params.closeCallback(this.res);
    }
  }
}

export function AnimationModalSlideUp() {
  return [
    trigger('state', [
      state('in', style({
        transform: 'translateY(0)',
      })),
      state('out', style({
        transform: 'translateY(100%)',
      })),
      state('void', style({
        transform: 'translateY(100%)',
      })),
      transition('in => out', animate('300ms ease-in')),
      transition('* => in', animate('300ms ease-in')),
    ]),
  ];
}

export function AnimationModalFadeIn() {
  return [
    trigger('state', [
      state('in', style({
        opacity: 1,
      })),
      state('out', style({
        opacity: 0,
      })),
      state('void', style({
        opacity: 0,
      })),
      transition('in => out', animate('300ms ease-in')),
      transition('* => in', animate('300ms ease-in')),
    ]),
  ];
}
