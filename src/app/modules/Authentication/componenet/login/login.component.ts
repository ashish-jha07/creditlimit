import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { UiService } from 'src/app/core/services/ui/ui.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { LoaderService } from 'src/app/core/services/ui/loader.service';


// import { AccountService, AlertService } from '@app/_services';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['']
  });
  submit: any;
  param1: any;
  constructor(private fb: FormBuilder,  private loader : LoaderService, private utils: UtilService, private routeActive: ActivatedRoute, private route: Router, private auth: AuthService, private ui: UiService, private storage: StorageService) { 
    //this.submitsso();
    let that = this;
    // this.routeActive.queryParams.subscribe(params => {

    //   this.param1 = params['UserName'];
 
    //   if(this.param1 != '' && this.param1){
    //   that.loader.show();
    //     let decrupted = this.utils.decryptionWithCryptoJS(this.param1);
       
    //     this.callbackApi1(decrupted);
    //   }
    // });

  }

  onSubmit() {

  }
  ngOnInit(): void {
    // this.storage.logout();


  }
  ngAfterViewInit(): void {
    // this. calltoLocal();
    // this.routeActive.queryParams.subscribe(params => {
    //   this.param1 = params['UserName'];
    //   // console.log("api data calback " + this.param1)
    //   // let inputplaintext = this.utils.encryptWithCryptoJS(this.param1);
    //   // console.log("encrpted data " + inputplaintext);
    //   // let decrupted = this.utils.decryptionWithCryptoJS(inputplaintext);
    //   // console.log("decrupted data " + decrupted)
    //   // this.callbackApi1(decrupted);
    //   if(this.param1 != '' && this.param1){
      
    //     let decrupted = this.utils.decryptionWithCryptoJS(this.param1);
    //     console.log("decrupted data " + decrupted)
    //     this.callbackApi1(decrupted);
    //   }
    // });
  }
  calltoLocal() {
    this.param1 = `Hello plain test`;
    console.log("api data calback " + this.param1)
    // let inputplaintext = this.utils.encrypta(this.param1);
    // console.log("encrpted data " + inputplaintext);
    if(this.param1 != '' && this.param1){
      let decrupted = this.utils.decryptb(this.param1);
      console.log("decrupted data " + decrupted)
      this.callbackApi1(decrupted);
    }
   
  }
  get username() { return this.loginForm.get('username'); }
  submitsso() {
    this.auth.getssourl((res: any) => {

      window.location.href = res.Response[0];
      //this.callbackApi();
      //this.route.navigate(['home/welcome'])
    })
    // this.callbackApi();
  }
  callbackApi1(username: any) {
    let that = this;
    // setTimeout(() => {
    //   this.callbackApi();
    // }, 1000);

    this.auth.loginbyBackend(username, (res: any) => {
      that.loader.hide();
      console.log("sunil login " + JSON.stringify(res))
      that.route.navigate(['home/welcome'])
    });
  }
  callbackApi() {
    let that = this;
    // setTimeout(() => {
    //   this.callbackApi();
    // }, 1000);
    this.auth.login1((res: any) => {
      if (res.StatusCode != 0) {
        setTimeout(() => {
          this.callbackApi();
        }, 1000);
      } else {
        this.route.navigate(['home/welcome'])
      }
    })
  }
  goTo() {
    this.submit = true;
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value, (res: any) => {
        console.log("sunil login " + JSON.stringify(res))
        this.route.navigate(['home/welcome'])
      })
    }
    else {
      this.ui.openToastMessage("Invalid form data.", 'error');
    }

  }
}