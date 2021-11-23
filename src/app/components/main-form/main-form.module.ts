import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MainFormComponent } from './main-form.component';

@NgModule({
  declarations: [MainFormComponent],
  imports: [CommonModule, FlexLayoutModule, MatInputModule, MatFormFieldModule],
  exports: [MainFormComponent],
})
export class MainFormModule {}
