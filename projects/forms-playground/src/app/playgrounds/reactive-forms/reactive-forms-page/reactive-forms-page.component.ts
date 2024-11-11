import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from "@angular/core";
import { formControl } from "@angular/core/schematics/migrations/typed-forms/util";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

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
  export class ReactiveFormsPageComponent implements OnInit, OnDestroy {
    form = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      nickname: new FormControl(''),
      email: new FormControl(''),
      passport: new FormControl(''),
      city: new FormControl(''),
      postCode:  new FormControl(''),
      address: new FormControl('')
    })
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }
}