import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type RatingOptions = 'great' | 'good' | 'neutral' | 'bad' | null;

@Component({
  selector: 'cfc-rating-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating-picker.component.html',
  styleUrls: ['./rating-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RatingPickerComponent,
      multi: true
    }
  ]
})
export class RatingPickerComponent implements OnInit, OnChanges, ControlValueAccessor {

  @Input()
  value: RatingOptions = null;

  @Input()
  disabled = false;

  @Output()
  change = new EventEmitter<RatingOptions>()

  @Input()
  @HostListener('attr.tabIndex')
  tabIndex = 0;

  @HostListener('blur')
  onBlur(){
    this.onTouch()
  }

  onChange: (newValue: RatingOptions) => void = () => {};
  onTouch: () => void = () => {};

  constructor(private cd: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['value']) {
      this.onChange(changes['value'].currentValue)
    }
  }

  ngOnInit(): void {}

  writeValue(obj: any): void {
    this.value = obj;
    this.cd.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cd.markForCheck();
  }

  setValue(value: RatingOptions) {
    if(!this.disabled) {
      this.value = value;
      this.onChange(this.value)
      this.onTouch();
      this.change.emit(this.value);
    }
    
  }


}
