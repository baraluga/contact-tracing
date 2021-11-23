import { Component } from '@angular/core';
import { Observable, take } from 'rxjs';
import { ContactTracingDetails } from './main-form.models';
import { MainFormService, Symptom } from './main-form.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss'],
  providers: [MainFormService],
})
export class MainFormComponent {
  mainForm: ContactTracingDetails = {};

  get establishments$(): Observable<string[]> {
    return this.service.getEstablishments();
  }

  get symptoms$(): Observable<Symptom[]> {
    return this.service.getPrevailingSymptoms();
  }

  get shouldDisable(): boolean {
    return Object.values(this.mainForm).filter((val) => !!val).length === 0;
  }

  get submitting$(): Observable<boolean> {
    return this.service.getLoadingState();
  }

  constructor(private service: MainFormService) {
    this.service.getAnimals().pipe(take(1)).subscribe();
  }

  onSubmit(): void {
    this.service.submitContractTracing(this.mainForm).pipe(take(1)).subscribe();
  }

  onClear(): void {
    this.mainForm = {};
  }
}
