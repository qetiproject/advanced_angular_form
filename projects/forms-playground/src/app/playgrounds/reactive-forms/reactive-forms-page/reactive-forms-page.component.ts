import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroupDirective, FormBuilder, FormControl, FormGroup, FormRecord, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { bufferCount, filter, Observable, startWith, Subscription, tap } from 'rxjs';
import { UserSkillsService } from '../../../core/user-skills.service';
import { banWords } from '../validators/ban-words.validator';
import { passwordShouldMatch } from '../validators/password-should-match.validator';
import { UniqueNicknameValidator } from '../validators/unique-nickname.validator';
import { DynamicValidatorMessage } from '../../../core/dynamic-validator-message.directive';
import { OnTouchedErrorStateMatcher } from '../../../core/input-error/error-state-matcher.service';
import { ValidatorMessageContainer } from '../../../core/input-error/validator-message-container.directive';

interface Address {
  fullAddress: FormControl<string>,
  city?: FormControl<string>,
  postCode?: FormControl<number>
}

@Component({
  selector: 'app-reactive-forms-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DynamicValidatorMessage, ValidatorMessageContainer],
  templateUrl: './reactive-forms-page.component.html',
  styleUrls: [
    '../../common-page.scss',
    '../../common-form.scss',
    './reactive-forms-page.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactiveFormsPageComponent implements OnInit, OnDestroy {

  phoneLabels = ['Main', 'Mobile', 'Work', 'Home'];
  years =  this.getYears();
  skills$!: Observable<string[]>;
  showErrorStrategy = new OnTouchedErrorStateMatcher();

  form = new FormGroup({
    firstName: new FormControl<string>(('Dmytro'), { nonNullable: true}),
    lastName: new FormControl('Mezhenskyi'),
    nickname: new FormControl(''),
    email: new FormControl('dmytro@decodedfrontend.io'),
    yearOfBirth: new FormControl(this.years[this.years.length - 1], {nonNullable: true}),
    passport: new FormControl(''),
    address: new FormGroup<Address>({
      fullAddress: new FormControl('', {nonNullable: true})
    }),
    phones: new FormArray([
      new FormGroup({
        label: new FormControl(this.phoneLabels[0]),
        phone: new FormControl('')
      })
    ]),
    // skills: new FormGroup<{[key: string]: FormControl<boolean>}>({}) // igivea FormRecord 
    skills: new FormRecord<FormControl<boolean>>({})
  });

  private ageValidators!: Subscription;
  private formPendingState!: Subscription;

  private initialFormValues: any;

  @ViewChild(FormGroupDirective)
  private formDir!: FormGroupDirective

  constructor(
    private userSkills: UserSkillsService,
    private fb: FormBuilder,
    private uniqueNickname: UniqueNicknameValidator,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // this.form.controls.firstName.reset() // setValue(null)
    this.skills$ = this.userSkills.getSkills().pipe(
      tap(skills => this.buildSkillControls(skills))
    )
  }

  ngOnDestroy(): void {
    this.ageValidators.unsubscribe();
    this.formPendingState.unsubscribe();
  }

  addPhone() {
   this.form.controls.phones.insert(0,
    new FormGroup({
      label: new FormControl(this.phoneLabels[0]),
      phone: new FormControl('')
    })
   )
  }

  removePhone(index: number) {
    this.form.controls.phones.removeAt(index);
  }

  onSubmit(e: Event) {
    console.log(this.form.value);
    this.initialFormValues = this.form.value;
    this.formDir.resetForm(this.form.value);
  }

  onReset(e: Event) {
    e.preventDefault();
    this.formDir.resetForm(this.initialFormValues);
  }

  private getYears() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40)).fill('').map((_, idx) => now - idx);
  }

  private buildSkillControls(skills: string[]) {
    skills.forEach(skill =>
      this.form.controls.skills.addControl(
        skill,
        new FormControl(false, { nonNullable: true })
      )
    );
  }

  private isAdult(yearOfBirth: number): boolean {
    const currentYear = new Date().getFullYear();
    return currentYear - yearOfBirth >= 18;
  }

}
