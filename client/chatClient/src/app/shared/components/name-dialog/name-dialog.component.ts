import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { validatorNoWhitespace } from '../../utils/utils';

@Component({
  selector: 'app-name-dialog',
  templateUrl: './name-dialog.component.html',
  styleUrls: ['./name-dialog.component.scss']
})
export class NameDialogComponent {
  textControl!: FormControl;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public description: string,
    public dialogRef: MatDialogRef<NameDialogComponent>
  ) {
    this.formValidator();
  }

  formValidator(): void {
    this.textControl = new FormControl('', [Validators.required, validatorNoWhitespace]);
  }

  get containsError(): boolean {
    return this.textControl.invalid && this.textControl.dirty;
  }
}
