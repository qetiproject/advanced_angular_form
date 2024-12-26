import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import '@polymer/paper-input/paper-textarea';

@Component({
  selector: 'app-rating-picker-page',
  templateUrl: './rating-picker-page.component.html',
  styleUrls: [
    '../../common-page.scss',
    './rating-picker-page.component.scss'
  ],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingPickerPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
