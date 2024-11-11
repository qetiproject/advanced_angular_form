import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserInfo } from '../../../core/user-info';

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
 
  userInfo: UserInfo = {
    firstName: 'Dmytro',
    lastName: 'Mezhenskyi',
    nickname: 'dmytro.mezhenkyi',
    email: 'dmytro@decodedfrontend.io',
    yearOfBirth: 1991,
    passport: 'AB123456',
    fullAdress: 'Somestreet 4',
    city: 'Kharkiv',
    postCode: 123456,
    password: '',
    confirmPassword: ''
  }

  get years() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40)).fill('').map((_, idx) => now - idx);
  }

  ngOnInit(): void {
  }

  onSubmitForm(e: SubmitEvent) {
    console.log(e.target)
  }
}
