import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import '@polymer/paper-input/paper-textarea';

@Component({
  selector: 'app-rating-picker-page',
  templateUrl: './rating-picker-page.component.html',
  styleUrls: [
    '../../common-page.scss',
    './rating-picker-page.component.scss'
  ],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingPickerPageComponent implements OnInit {

  form = this.fb.group({
    reviewText: ''
  })
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.form.value)
    this.form.reset()
  }

}
