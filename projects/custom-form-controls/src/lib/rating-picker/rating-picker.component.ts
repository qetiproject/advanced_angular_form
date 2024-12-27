import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cfc-rating-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating-picker.component.html',
  styleUrls: ['./rating-picker.component.scss']
})
export class RatingPickerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
