import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Hero } from '../heroes/hero';
import { HeroService } from '../heroes/hero.service';

@Component({
  selector: 'dashboard',
  templateUrl: '/partial/dashboard',
  styleUrls: ['app/components/dashboard/dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  note: string;
  isLoading: boolean;

  constructor(
    private _router: Router,
    private _heroService: HeroService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this._heroService.getHeroes()
      .subscribe((heroes) => {
        this.heroes = heroes.slice(1, 5);
        this.isLoading = false;
      });

    this.note = `The '/partial/dashboard' path routes through the 'PartialController' and the
                   corresponding 'Dashboard' action for no reason other than to provide and
                   example of how this can be done. See also 'Dashboard.cshtml'`;
  }

  gotoDetail(hero: Hero) {
    let link = ['HeroDetail', { id: hero.id }];
    this._router.navigate(link);
  }
}
