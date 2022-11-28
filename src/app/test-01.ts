/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ng-app',
  template: `<div>
    <h2>Loan Details</h2>
    <b>Monthly Payment:</b>

    {{ calculatMonthlyPayment() | currency: 'USD':'symbol':'1.2-2' }}
    <br />
    <b
      >Late Payment Fee :
      {{ calculateLatePayment() | currency: 'USD':'symbol':'1.2-2' }}</b
    >
    <br />
  </div>`,
})
export class Test01Component {
  loan_amount: number = 1000;
  monthly_payment: number = 1000;
  late_payment = 200;

  calculatMonthlyPayment() {
    if (!this.monthly_payment) {
      return 'N/A';
    } else {
      return this.monthly_payment + this.loan_amount * 0.02;
    }
  }

  calculateLatePayment() {
    if (!this.late_payment) {
      return 'N/A';
    } else {
      return this.late_payment + this.loan_amount * 0.05;
    }
  }
}

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: Test01Component,
      },
    ]),
    CommonModule,
  ],
  declarations: [Test01Component],
})
export class Test01Module {}
