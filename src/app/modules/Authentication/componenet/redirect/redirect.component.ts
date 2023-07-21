import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { LoaderService } from 'src/app/core/services/ui/loader.service';
import { UiService } from 'src/app/core/services/ui/ui.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {
  param1: any;
  constructor( private loader : LoaderService, private utils: UtilService, private routeActive: ActivatedRoute, private route: Router, private auth: AuthService, private ui: UiService, private storage: StorageService) {
    let that = this;
    this.routeActive.queryParams.subscribe(params => {

      this.param1 = params['UserName'];
 
      if(this.param1 != '' && this.param1){
      that.loader.show();
        let decrupted = this.utils.decryptionWithCryptoJS(this.param1);
       
        this.callbackApi1(decrupted);
      }
    });
   }

  ngOnInit(): void {
  }
  callbackApi1(username: any) {
    let that = this;
    this.auth.loginbyBackend(username, (res: any) => {
      that.loader.hide();
      console.log("sunil login " + JSON.stringify(res))
      that.route.navigate(['home/welcome'])
    });
  }
}
