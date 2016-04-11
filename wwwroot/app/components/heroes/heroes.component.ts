import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/components/heroes/heroes.component.html',
  styleUrls: ['app/components/heroes/heroes.component.css'],
  directives: [HeroDetailComponent]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  isLoading: boolean;

  constructor(
    private _router: Router,
    private _heroService: HeroService) { }

  getHeroes() {
    this.isLoading = true;
    this._heroService.getHeroes()
      .subscribe((heroes) => {
        this.heroes = heroes;
        this.isLoading = false;
      });
  }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero) { this.selectedHero = hero; }

  gotoDetail() {
    this._router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
  }
}
