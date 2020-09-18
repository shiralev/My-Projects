import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class StateService {

  private _isLoggedIn: boolean = false;
  private _userName: string = "";

  get userName(): string {
    return this._userName;
  }

  set userName(name: string) {
    this._userName = name;
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  set isLoggedIn(mode: boolean) {
    this._isLoggedIn = mode;
  }
}
