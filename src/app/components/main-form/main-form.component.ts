import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, take } from 'rxjs';
import { MainFormService, Symptom } from './main-form.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss'],
  providers: [MainFormService],
})
export class MainFormComponent {
  readonly reactiveMainForm: FormGroup = new FormGroup({
    name: new FormControl(undefined, [
      Validators.required,
      Validators.minLength(5),
    ]),
    date: new FormControl(),
    establishment: new FormControl(),
    symptoms: new FormControl(),
  });
  readonly nameControl: FormControl = this.reactiveMainForm.get(
    'name'
  ) as FormControl;

  get establishments$(): Observable<string[]> {
    return this.service.getEstablishments();
  }

  get symptoms$(): Observable<Symptom[]> {
    return this.service.getPrevailingSymptoms();
  }

  get submitting$(): Observable<boolean> {
    return this.service.getLoadingState();
  }

  constructor(private service: MainFormService) {
    this.service.getAnimals().pipe(take(1)).subscribe();

    this.getEstablishmentChanges().subscribe((est) =>
      this.isEstablishmentUniqlo(est)
        ? this.handleUniqloEstablishment()
        : this.getSymptomsControl().enable()
    );
  }

  onSubmit(): void {
    this.service
      .submitContractTracing(this.reactiveMainForm.getRawValue())
      .pipe(take(1))
      .subscribe();
  }

  onClear(): void {}

  private handleUniqloEstablishment(): void {
    this.getSymptomsControl().disable();
  }

  private getSymptomsControl(): FormControl {
    return this.reactiveMainForm.get('symptoms') as FormControl;
  }

  private isEstablishmentUniqlo(est: string): boolean {
    return est === 'Uniqlo';
  }

  private getEstablishmentChanges(): Observable<string> {
    return this.reactiveMainForm.get('establishment')
      ?.valueChanges as Observable<string>;
  }
}
