import {
  describe,
  expect,
  it
} from 'angular2/testing';

import { Hero } from './hero';

export function main() {
  describe('Hero', () => {
    it('has name', () => {
      let hero: Hero = { id: 1, name: 'Super Cat' };
      expect(hero.name).toEqual('Super Cat');
    });

    it('has id', () => {
      let hero: Hero = { id: 1, name: 'Super Cat' };
      expect(hero.id).toEqual(1);
    });
  });
}
