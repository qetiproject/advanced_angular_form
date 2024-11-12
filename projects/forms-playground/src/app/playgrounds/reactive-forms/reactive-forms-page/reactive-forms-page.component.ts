import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Observable, tap } from "rxjs";
import { UserSkillsService } from "../../../core/user-skills.service";

@Component({
    selector: 'app-reactive-forms-page',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './reactive-forms-page.component.html',
    styleUrls: [
      '../../common-page.scss',
      '../../common-form.scss',
      './reactive-forms-page.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class ReactiveFormsPageComponent implements OnInit {
    phoneLabels = ['Main', 'Mobile', 'Work', 'Home'];
    years =  this.getYears();
    skills$!: Observable<string[]>;

    constructor(private userSkills: UserSkillsService, private fb: FormBuilder) {}

    // form = new FormGroup({
    //   firstName: new FormControl<string>('keti', {nonNullable: true}),
    //   lastName: new FormControl('khetsuriani'),
    //   nickname: new FormControl(''),
    //   email: new FormControl('keti@gmail.com'),
    //   passport: new FormControl(''),
    //   yearOfBirth: new FormControl(this.years[this.years.length - 1], { nonNullable: true}),
    //   address: new FormGroup({
    //     fullAddress: new FormControl('', { nonNullable: true}),
    //     city: new FormControl('', { nonNullable: true}),
    //     postCode:  new FormControl(0, { nonNullable: true}),
    //   }),
    //   phones: new FormArray([
    //     new FormGroup({
    //       label: new FormControl(this.phoneLabels[0], { nonNullable: true}),
    //       phone: new FormControl('')
    //     })
    //   ]),
    //   // skills: new FormGroup<{[key: string]: FormControl<boolean>}>({})
    //   skills: new FormRecord<FormControl<boolean>>({})
    // })

    form = this.fb.group({
      firstName: ['Dmytro', [Validators.required, Validators.minLength(4)]],
      lastName: ['Mezhenskyi', [Validators.required, Validators.minLength(2)]],
      nickname: ['',
      {
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[\w.]+$/),
        ],
      },
  
    ],
      email: ['dmytro@decodedfrontend.io', [Validators.email, Validators.required]],
      yearOfBirth: this.fb.nonNullable.control(
        this.years[this.years.length - 1],
        Validators.required
      ),
      passport: ['', [Validators.pattern(/^[A-Z]{2}[0-9]{6}$/)]],
      address: this.fb.nonNullable.group({
        fullAddress: ['', Validators.required],
        city: ['', Validators.required],
        postCode: [0, Validators.required]
      }),
      phones: this.fb.array([
        this.fb.group({
          label: this.fb.nonNullable.control(this.phoneLabels[0]),
          phone: ''
        })
      ]),
      skills: this.fb.record<boolean>({}),
      // password: this.fb.group({
      //   password: ['', [Validators.required, Validators.minLength(6)]],
      //   confirmPassword: ''
      // })
    });

    ngOnInit(): void {
      this.skills$ = this.userSkills.getSkills().pipe(
        tap(skills => this.buildSkillControls(skills))
      )
    }

    addPhone() {
      this.form.controls.phones.insert(0,
        new FormGroup({
          label: new FormControl(this.phoneLabels[0], { nonNullable: true}),
          phone: new FormControl('')
        })
      )
    }

    removePhone(index: number) {
      this.form.controls.phones.removeAt(index)
    }

    onSubmit(e: Event) {
      this.form.controls.firstName.reset()
      console.log(this.form.value)
    }

    private getYears() {
      const now = new Date().getUTCFullYear();
      return Array(now - (now - 40)).fill('').map((_, idx) => now - idx);
    }

    private buildSkillControls(skills: string[]) {
      skills.forEach(skill => this.form.controls.skills.addControl(
        skill,
        new FormControl(false, { nonNullable: true})
      ))
    }
}