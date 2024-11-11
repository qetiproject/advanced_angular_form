import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector: '[appBanWords]',
    standalone: true,
    providers: [
        {provide: NG_VALIDATORS, useExisting: BanWordsDirective, multi: true}
    ]
})

export class BanWordsDirective implements Validator{
     
    @Input()
    appBanWords = ''

    constructor() {}

    validate(control: AbstractControl): ValidationErrors | null {
        return control.value !== this.appBanWords
            ? null
            : { appBanWords: { bannedWord: this.appBanWords}}
    }

}