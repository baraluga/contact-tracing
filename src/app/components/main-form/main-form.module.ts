import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MainFormComponent } from './main-form.component';

@NgModule({
  declarations: [MainFormComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [MainFormComponent],
})
export class MainFormModule {}
