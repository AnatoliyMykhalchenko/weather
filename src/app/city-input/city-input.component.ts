import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-city-input',
  templateUrl: './city-input.component.html',
  styleUrls: ['./city-input.component.scss'],
})
export class CityInputComponent {
  @Output() cityControlChangeValue = new EventEmitter();

  cityControl = new FormControl('');

  cityForm = new FormGroup({
    cityControl: this.cityControl,
  });

  constructor() {}

  search() {
    if (this.cityControl.value) {
      this.cityControlChangeValue.emit(this.cityControl.value);
      this.cityControl.reset();
    }
  }
}
