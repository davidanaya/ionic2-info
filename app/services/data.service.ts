import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class DataService {

  private http: Http;

  constructor(@Inject(Http) http:Http) {
  }

  getJson(url: string, update: number) {
    if (update !== -1) {
      return Observable.timer(0, update)
        .flatMap(() => this.http.get(url))
        .map(response => response.json());
    } else {
      return this.http.get(url)
        .map(response => response.json());
    }
  }

}
