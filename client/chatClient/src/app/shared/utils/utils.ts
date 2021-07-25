import { FormControl } from "@angular/forms";

type WhiteSpace = {
  whitespace: boolean
}

export function validatorNoWhitespace(control: FormControl): WhiteSpace | null {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: isWhitespace };
}
