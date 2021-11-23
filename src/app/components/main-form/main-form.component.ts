import { Component, OnInit } from '@angular/core';

interface TracingMainForm {
  fullName: string;
  date: Date | undefined;
}

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss'],
})
export class MainFormComponent {
  mainForm: TracingMainForm = {
    fullName: '',
    date: undefined,
  };

  onSubmit(): void {
    console.log(this.mainForm);
  }
}
