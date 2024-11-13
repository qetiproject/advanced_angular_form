import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators,  } from '@angular/forms';
import { UniqueUsernameValidator } from '../unique_username.service';
import { debounceTime, distinctUntilChanged, filter, Subscription } from 'rxjs';
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

  private destroyed$!: Subscription;

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
   this.form.controls.gender.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged()
   ).subscribe((value) => console.log(value, "value")
   );
  }

  onSubmit(event: Event): void {
    console.log(this.form.value)
    this.formDir.resetForm();
  }

  ngOnDestroy(): void {
    this.pendingState.unsubscribe();
    this.destroyed$.unsubscribe();
  }


}
