import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent implements ControlValueAccessor, OnInit {
  @Input("genders") genders: any[] = [];
  searchSubject: Subject<string> = new Subject<string>();

  reactiveSearchString = new FormControl('')

  value: string = ''; 
  onChangeFn: (value: string) => void = () => {}; 
  onTouchFn: () => void = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchFn = fn;
  }

  onChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.value = value;

    this.onChangeFn(value);

    this.onTouchFn();
  }

  ngOnInit(): void {
    // this.searchSubject.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    // ).subscribe(
    //   (value) => {
    //     this.onChangeFn(value),
    //     this.searchItems(value)
    //   }
    // )
    // standalone formcontrols
    // this.reactiveSearchString.valueChanges.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   // swichmap(string => ...http.call(string...))
    // ).subscribe(console.log)
  }

  searchItems(value: string): void {

  }
}
