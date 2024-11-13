import { CommonModule } from '@angular/common';
import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  imports: [CommonModule],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements ControlValueAccessor {

  genders = [
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' },
  ];
  
  value: string = ""
  onChangeValue: string = ""

  onTouch: any = () => {}

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(value: string): void {
    this.onChangeValue = value
  }

  registerOnTouched(fn: any): void {
    this.onTouch(fn)
  }

  onChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value
    console.log(value)
  }

}
