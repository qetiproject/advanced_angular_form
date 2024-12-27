import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import '@polymer/paper-input/paper-textarea';
import { EditableContentValueAccessor } from '../value-accessor/editable-content.directive';
import { RatingPickerComponent } from 'projects/custom-form-controls/src/public-api';
import { RatingOptions } from 'projects/custom-form-controls/src/lib/rating-picker/rating-picker.component';

interface Rating {
  reviewText: string;
  reviewRating: RatingOptions;
}
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

  form = this.fb.group<Rating>({
    reviewText: '',
    reviewRating: 'great'
  })
  
  constructor(private fb: FormBuilder) { 
    // setTimeout(() => {
    //   this.form.controls.reviewText.setValue('Changed Hello')
    // })
    // this.form.controls.reviewText.disable() //if you want to make disable
  }

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.form.value)
    this.form.reset()
  }

}
