import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class RefreshService {
  private refreshCounter = new Subject<any>();
  private ObservableTheme = new Subject<any>();
  private theme = '';

  setRefreshCounter(counter: number) {
    this.refreshCounter.next(counter);
  }

  getRefreshCounter(): Observable<any> {
    return this.refreshCounter.asObservable();
  }

  setObservableTheme(theme: string) {
    this.ObservableTheme.next(theme);
    this.theme = theme;
  }

  getObservableTheme(): Observable<any> {
    return this.ObservableTheme.asObservable();
  }

  getTheme() {
    return this.theme;
  }
}
