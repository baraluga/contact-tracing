import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

const ESTABLISHMENTS: string[] = ['Uniqlo', 'Japan Home Center', 'Datablitz'];

@Injectable()
export class MainFormService {
  readonly establishmentsSubject = new BehaviorSubject<string[]>(
    ESTABLISHMENTS
  );

  constructor() {
    setTimeout(() => {
      this.establishmentsSubject.next(
        this.appendToEstablishments('Toy Kingdom')
      );
    }, 3000);
  }

  private appendToEstablishments(what: string): string[] {
    return [...this.establishmentsSubject.value, what];
  }

  getEstablishments(): Observable<string[]> {
    return this.establishmentsSubject.asObservable();
  }
}
