import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Router, NavigationEnd } from "@angular/router";
import { StateService } from "./services/state/state.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: [ "./app.component.css" ]
})
export class AppComponent implements OnInit  {

  constructor(private location: Location, private router: Router, private appState: StateService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if(event instanceof NavigationEnd) {
        if (event.url) {
          if(!this.appState.isLoggedIn && event.url !== "/") {
            this.router.navigateByUrl("");
          }
        }
      }
    });
  }

}
