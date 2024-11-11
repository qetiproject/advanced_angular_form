import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-forms-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './template-forms-page.component.html',
  styleUrls: [
    '../../common-page.scss',
    '../../common-form.scss',
    './template-forms-page.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateFormsPageComponent implements OnInit {

  get years() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40)).fill('').map((_, idx) => now - idx);
  }

  ngOnInit(): void {
  }

  onSubmitForm(e: SubmitEvent) {}
}
