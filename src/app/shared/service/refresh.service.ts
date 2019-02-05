import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class RefreshService {
  private refreshCounter = new Subject<any>();

  setRefreshCounter(counter: number) {
    this.refreshCounter.next(counter);
  }

  getRefreshCounter(): Observable<any> {
    return this.refreshCounter.asObservable();
  }

  setTheme(theme: string) {
    this.refreshCounter.next(theme);
  }

  getTheme(): Observable<any> {
    return this.refreshCounter.asObservable();
  }
}
