import { Component, OnInit, OnChanges } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { StateService } from  "../../services/state/state.service"; 
import { UserLogin } from "../../data/user-login";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, OnChanges {

  formGroup: FormGroup;
  User: string;
  Pass: string;
  isError: boolean;

  constructor(private router: Router, private fb: FormBuilder, private appState: StateService) { }

  ngOnInit(): void {
    this.isError = false;
    this.formGroup = this.fb.group({
      user: new FormControl("", [Validators.required]),
      pass: new FormControl("", [Validators.required]),
    });
    this.ngOnChanges();
  }

  ngOnChanges(): void {
    this.formGroup.get("user").valueChanges.subscribe(val => {
      this.isError = false;
      this.User = val;
    });
    this.formGroup.get("pass").valueChanges.subscribe(val => {
      this.isError = false;
      this.Pass = val;
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  }

  run(): void {
    if(!this.formGroup.invalid) {
      if (this.User === UserLogin.user_name && this.Pass === UserLogin.password) {
        this.appState.isLoggedIn = true;
        this.appState.userName = this.User;
        this.router.navigateByUrl("/secure");
      } else {
        this.isError = true;
      }
    }
  }
}
