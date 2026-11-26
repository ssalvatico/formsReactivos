import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterPageComponent],
  imports: [CommonModule, AuthRoutingModule, ɵInternalFormsSharedModule, ReactiveFormsModule],
})
export class AuthModule {}
