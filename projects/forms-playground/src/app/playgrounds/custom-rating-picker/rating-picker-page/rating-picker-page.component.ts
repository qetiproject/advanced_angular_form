import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import '@polymer/paper-input/paper-textarea';
import { EditableContentValueAccessor } from '../value-accessor/editable-content.directive';
import { RatingPickerComponent } from 'projects/custom-form-controls/src/public-api';

@Component({
  selector: 'app-rating-picker-page',
  templateUrl: './rating-picker-page.component.html',
  styleUrls: [
    '../../common-page.scss',
    './rating-picker-page.component.scss'
  ],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EditableContentValueAccessor, RatingPickerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingPickerPageComponent implements OnInit {

  form = this.fb.group({
    reviewText: ''
  })
  
  constructor(private fb: FormBuilder) { 
    // setTimeout(() => {
    //   this.form.controls.reviewText.setValue('Changed Hello')
    // })
    // this.form.controls.reviewText.disable() //if you want to make disable
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.form.reset()
  }

}
