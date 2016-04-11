import { Observable } from 'rxjs/Rx';
import { Response, Http } from 'angular2/http';
import { Injectable } from 'angular2/core';

import { Hero } from './hero';

@Injectable()
export class HeroService {
  constructor(private _http: Http) { }

  private heroApi: string = 'api/hero';

  getHeroes(): Observable<Hero[]> {
    return this._http.get(`${this.heroApi}`)
      .map((response: Response) => <Hero[]>response.json());
  }

  getHero(id: number): Observable<Hero> {
    return this._http.get(`${this.heroApi}/${id}`)
      .map((response: Response) => <Hero>response.json());
  }
}
