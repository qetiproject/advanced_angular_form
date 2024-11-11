import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicValidatorMessage } from "../../../core/dynamic-validator-message.directive";
import { ValidatorMessageContainer } from "../../../core/input-error/validator-message-container.directive";

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
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }
}