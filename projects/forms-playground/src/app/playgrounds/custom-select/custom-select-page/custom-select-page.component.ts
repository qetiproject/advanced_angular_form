import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'projects/custom-form-controls/src/public-api';

@Component({
  selector: 'app-custom-select-page',
  templateUrl: './custom-select-page.component.html',
  styleUrls: ['./custom-select-page.component.scss'],
  imports: [CommonModule, SelectModule, ReactiveFormsModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomSelectPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
