import { NgModule } from '@angular/core';

/* components */
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [AuthComponent, SignInComponent, SignUpComponent],
  imports: [AuthRoutingModule],
})
export class AuthModule {}
