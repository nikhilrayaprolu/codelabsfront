import {ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {NB_AUTH_OPTIONS, NbAuthResult, NbAuthService, NbRegisterComponent} from '@nebular/auth';
import {Router} from "@angular/router";
import {RegisterService} from "../../services/register.service";
import {NbStepperComponent} from "@nebular/theme";

@Component({
  selector: "register",
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends NbRegisterComponent {
  user_id: number;
  site: any = {
    name : null,
    subdomain : null
  };
  user_email: string;
  user_token: string;
  constructor(protected servicedummy: RegisterService,
              protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef,
              protected router: Router) {
    super(service, options, cd, router);
  }
  @ViewChild(NbStepperComponent) stepper: NbStepperComponent;
  registeradmin(): void {
    this.errors = this.messages = [];
    console.log(this.user)
    this.servicedummy.register(this.user).subscribe((result: any) => {
      this.user_email = result.email;
      this.user_token = result.token_object;
      this.stepper.next()

    });
  }
  register_site() {
    this.servicedummy.register_site(this.user_email, this.site).subscribe((result:any) => {
      if (result.organization) {
        this.router.navigate(['auth/login']);
      }
    });
  }

}
