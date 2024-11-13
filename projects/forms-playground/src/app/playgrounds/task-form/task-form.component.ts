import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators,  } from '@angular/forms';
import { UniqueUsernameValidator } from '../unique_username.service';
import { filter, Subscription } from 'rxjs';
import { DropdownComponent } from "../dropdown/dropdown.component";

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
    password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{6,}')]],
    gender: ['', Validators.required]
  });

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
