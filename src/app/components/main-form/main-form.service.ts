import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  delay,
  finalize,
  Observable,
  of,
  pluck,
  tap,
} from 'rxjs';
import { ContactTracingDetails } from './main-form.models';

const ESTABLISHMENTS: string[] = ['Uniqlo', 'Japan Home Center', 'Datablitz'];
const SYMPTOMS: Symptom[] = [
  { id: '1', name: 'Cough' },
  { id: '2', name: 'Fever' },
  { id: '3', name: 'Sore Throat' },
];

export interface Symptom {
  readonly id: string;
  readonly name: string;
}

interface State {
  readonly forms: ContactTracingDetails[];
  readonly loading: boolean;
  readonly submitSuccess: boolean;
  readonly animals?: unknown[];
}

@Injectable()
export class MainFormService {
  private readonly state = new BehaviorSubject<State>({
    forms: [],
    loading: false,
    submitSuccess: false,
  });

  private readonly establishmentsSubject = new BehaviorSubject<string[]>(
    ESTABLISHMENTS
  );

  constructor(private http: HttpClient) {}

  getLoadingState(): Observable<boolean> {
    return this.state.pipe(pluck('loading'));
  }

  getEstablishments(): Observable<string[]> {
    return this.establishmentsSubject.asObservable();
  }

  getPrevailingSymptoms(): Observable<Symptom[]> {
    return of(SYMPTOMS);
  }

  getAnimals(): Observable<unknown> {
    return this.http
      .get<{ animals: unknown[] }>('assets/mocks/animals.json')
      .pipe(tap((rsp) => this.updateAnimals(rsp.animals)));
  }

  submitContractTracing(
    tracingDetails: ContactTracingDetails
  ): Observable<unknown> {
    this.updateLoading(true);
    this.updateSubmitSuccess(false);

    return this.http
      .post<ContactTracingDetails>(
        'https://jsonplaceholder.typicode.com/todos',
        tracingDetails
      )
      .pipe(
        delay(1000),
        tap((rsp) => this.addToState(rsp)),
        tap(() => this.updateSubmitSuccess(true)),
        finalize(() => this.updateLoading(false))
      );
  }

  private updateAnimals(animals: unknown[]): void {
    this.state.next({ ...this.state.value, animals });
  }

  private updateSubmitSuccess(submitSuccess: boolean): void {
    this.state.next({ ...this.state.value, submitSuccess });
  }

  private updateLoading(loading: boolean): void {
    this.state.next({ ...this.state.value, loading });
  }

  private addToState(details: ContactTracingDetails): void {
    this.state.next({ ...this.state.value, forms: this.addToForms(details) });
  }

  private addToForms(details: ContactTracingDetails): ContactTracingDetails[] {
    const currentForms = this.state.value.forms;
    return [...currentForms, details];
  }
}
