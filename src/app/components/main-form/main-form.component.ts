import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MainFormService } from './main-form.service';

interface TracingMainForm {
  fullName?: string;
  date?: Date | undefined;
  establishment?: string;
  noSymptoms?: boolean;
}

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss'],
  providers: [MainFormService],
})
export class MainFormComponent {
  mainForm: TracingMainForm = {};

  get establishments$(): Observable<string[]> {
    return this.service.getEstablishments();
  }

  constructor(private service: MainFormService) {}

  onSubmit(): void {
    console.log(this.mainForm);
  }

  onClear(): void {
    this.mainForm = {};
  }
}
