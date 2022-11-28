/**
 * Update the following components to meet the requirements :
 *
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 *
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 *
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-app',
  template: `<form>
    <h2>Login</h2>
    <br />
    <input
      type="email"
      [value]="email"
      (change)="onChange($event)"
      name="email"
    />

    <br />
    <div *ngIf="isEmailValid">
      Please enter a valid email
      <br />
    </div>

    <input
      type="text"
      [value]="password"
      name="password"
      (change)="onChange($event)"
    />
    <br />
    <div *ngIf="isPasswordValid">
      Please enter a valid password
      <br />
    </div>

    <button type="submit" (click)="onSubmit($event)">Submit</button>
    <br /><br />
    <div *ngIf="logged_in">Logged In!</div>
  </form>`,
})
export class Test03Component {
  email: string = '';
  isEmailValid: boolean = false;
  password: string = '';
  isPasswordValid: boolean = false;
  logged_in = false;

  onChange(event) {
    const inputName = event.target.name;

    if (inputName === 'email') {
      this.isEmailValid = false;
    } else if (inputName === 'password') {
      this.isPasswordValid = false;
    }

    this[inputName] = event.target.value;
  }

  onSubmit(event) {
    event.preventDefault();
    const email = this.email;
    const password = this.password;

    const emailRegex = new RegExp(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    );

    this.isEmailValid = !emailRegex.test(email);

    // has 1 special character, 1 upper case, 1 lower case, 1 number, min 8 characters
    const passwordRegex = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    );

    console.log(passwordRegex.test(password));

    this.isPasswordValid = !passwordRegex.test(password);
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: Test03Component,
      },
    ]),
  ],
  declarations: [Test03Component],
})
export class Test03Module {}
