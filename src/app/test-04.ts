/**
 * Add 2 input forms in the following component for first name and last name. Once both forms are filled out by the user, and user has clicked out of the fields, then beside it a username should be automatically generated which should be in the following format: [firstname]_[lastname]_[random integer]
 * First name and last name should be lowercased, and then a random integer between 1 and 9 should be added to the end
 * For example: if the inputs are "John" and "DOE" the generated username could be "john_doe_4" or "john_doe_2"
 */
import { Component, NgModule, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-app',
  template: `
    <h2>Enter your first and last name</h2>
    <div>
      <input
        type="text"
        name="firstName"
        [value]="firstName"
        (change)="onChange($event)"
        placeholder="First Name"
      />
      <input
        type="text"
        name="lastName"
        [value]="lastName"
        (change)="onChange($event)"
        placeholder="Last Name"
      />
      <h3 *ngIf="result.length > 0">{{ result }}</h3>
    </div>
  `,
  styles: [],
})
export class UserNameComponent {
  firstName: string = '';
  lastName: string = '';
  randomNumber: number = 1;

  result: string = '';
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  onChange(event) {
    const inputName = event.target.name;

    if (inputName === 'firstName') {
      this.lastName = this.lastName.length > 0 ? '' : this.lastName;
    }

    this[inputName] = event.target.value;

    if (this.firstName && this.lastName) {
      this.randomNumber = Math.floor(Math.random() * 9) + 1;
      this.result = `${this.firstName.toLowerCase()}_${this.lastName.toLowerCase()}_${
        this.randomNumber
      }`;
    }
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserNameComponent,
      },
    ]),
  ],
  declarations: [UserNameComponent],
})
export class UserNameModule {}
