import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordLengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
        return regex.test(value) ? null : { passwordLength: true}
    }
}