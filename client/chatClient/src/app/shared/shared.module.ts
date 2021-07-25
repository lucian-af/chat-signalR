import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NameDialogComponent } from './components/name-dialog/name-dialog.component';
import { MaterialModule } from "./material.module";

@NgModule({
  imports: [
    MaterialModule,
    CommonModule
  ],
  exports: [
    NameDialogComponent
  ],
  declarations: [
    NameDialogComponent
  ]
})
export class SharedModule { }
