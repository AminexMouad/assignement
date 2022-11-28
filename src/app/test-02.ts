/**
 * Update the following components to meet the requirements :
 * * Bind `field` of [textfield] component to its text input
 * * Pass value of `field` from [textfield] component to [title] property of component [ng-app]
 */
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'textfield',
  template:
    '<input type="text" [value]="field" (change)="onTextChange($event)" />',
})
export class TextField {
  field: string = '';
  @Output() onChangeField: EventEmitter<string>;

  constructor() {
    this.onChangeField = new EventEmitter();
  }

  onTextChange(event) {
    this.field = event.target.value;
    this.onChangeField.emit(event);
  }
}

@Component({
  selector: 'child-component',
  template: `<h2>
    Title:
    <h2>
      <br /><textfield (onChangeField)="onChangeField($event)"></textfield>
    </h2>
  </h2>`,
})
export class ChildComponent {
  @Input() title: String;
  @Output() changeText: EventEmitter<string>;

  constructor() {
    this.changeText = new EventEmitter();
  }

  onChangeField(event) {
    this.changeText.emit(event);
  }
}

@Component({
  selector: 'ng-app',
  template: `<div>
    <child-component
      [title]
      (changeText)="onTextChange($event)"
    ></child-component>
    <br />
    Title is {{ title }}
  </div>`,
})
export class Test02Component {
  title: string = '';

  onTextChange(event) {
    this.title = event.target.value;
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: Test02Component,
      },
    ]),
  ],
  declarations: [Test02Component, ChildComponent, TextField],
})
export class Test02Module {}
