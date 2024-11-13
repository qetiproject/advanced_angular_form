import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators,  } from '@angular/forms';
import { UniqueUsernameValidator } from '../unique_username.service';
import { debounceTime, filter, map, Subscription, switchMap } from 'rxjs';
import { DropdownComponent } from "../dropdown/dropdown.component";
import { passwordLengthValidator } from '../password.validator';
import { EmailValidatorService } from '../email.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DropdownComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormComponent implements OnInit, OnDestroy {
  private pendingState!: Subscription;
  @ViewChild(FormGroupDirective)
  formDir!: FormGroupDirective;

  search: string = ""

  genders = [
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' },
  ];
  
  constructor(
    private fb: FormBuilder,
    private uniqueUsername: UniqueUsernameValidator,
    private cd: ChangeDetectorRef,
    private emailService: EmailValidatorService
  ) { }

  form = this.fb.group({
    username: [
      '', 
      [
        Validators.required,  
        Validators.minLength(5) 
      ],
      [
        this.uniqueUsername.validate.bind(this.uniqueUsername) 
      ],
      { updateOn: 'blur' } 
    ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required,passwordLengthValidator()]],
    gender: ['', Validators.required],
   
    addAddressOption: [''],
    addresses: this.fb.array([])
  });

  get addresses(): FormArray {
    return this.form.get('addresses') as FormArray;
  }

  onAddressOptionChange(event: Event): void {
    const option = (event.target as HTMLSelectElement).value
    console.log(option)
    if(option === 'add') {
      this.addAddress()
    }else {
      this.removeAddress()
    }
  }

  // emailAsyncValidator(control: FormControl) {
  //   return control.valueChanges.pipe(
  //     debounceTime(300),
  //     switchMap(value => this.emailService.checkEmailExists(value)),
  //     map((exists => exists ? { emailTaken: true} : null))
  //   )
  // }

  addAddress() {
    const addressGroup = this.fb.group({
        street: ['', [Validators.required]],
        zipcode: [0, Validators.pattern('[0-9]{5}')],
        city: ['', Validators.required],
        country: ['', Validators.required]
      })

    this.addresses.push(addressGroup);
  }

  removeAddress() {
    while(this.addresses.length) {
      this.addresses.removeAt(0)
    }
  }

  ngOnInit(): void {
   this.pendingState = this.form.statusChanges.pipe(
    filter(pendingState => pendingState === "PENDING")
   ).subscribe(() => this.cd.markForCheck());
  }

  onSubmit(): void {
    console.log(this.form.value)
    this.formDir.resetForm();
  }

  ngOnDestroy(): void {
    this.pendingState.unsubscribe();
  }



}
