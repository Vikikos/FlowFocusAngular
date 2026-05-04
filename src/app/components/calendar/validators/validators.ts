import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function optionsValidator(allowedValues: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const isValueAllowed = allowedValues.includes(control.value);

    return isValueAllowed ? null : { invalidOption: { value: control.value } };
  };
}