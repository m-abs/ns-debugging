import {Observable} from 'data/observable';
import * as connectivity from 'connectivity';
connectivity.connectionType.mobile

export class HelloWorldModel extends Observable {

  private _counter: number;
  private _message: string;
  private _networkStatus: string;

  constructor() {
    super();

    // Initialize default values.
    this._counter = 42;
    this.updateMessage();

    connectivity.startMonitoring((status) => {
      console.log(status);
      switch (status) {
        case connectivity.connectionType.mobile: {
          this.networkStatus = 'MOBILE';
          break;
        }
        case connectivity.connectionType.wifi: {
          this.networkStatus = 'WIFI';
          break;
        }
        case connectivity.connectionType.none: {
          this.networkStatus = 'OFFLINE';
          break;
        }
        default: {
          this.networkStatus = 'UNKNOWN';
          break;
        }
      }
    });
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    if (this._message !== value) {
      this._message = value;
      this.notifyPropertyChange('message', value)
    }
  }

  public onTap() {
    this._counter--;
    this.updateMessage();
  }

  private updateMessage() {
    if (this._counter <= 0) {
      this.message = 'Hoorraaay! You unlocked the NativeScript clicker achievement!';
    } else {
      this.message = `${this._counter} taps left`;
    }
  }

  get networkStatus() {
    return this._networkStatus
  }

  set networkStatus(value: string) {
    this._networkStatus = value;

    this.notifyPropertyChange('networkStatus', value);
  }
}
