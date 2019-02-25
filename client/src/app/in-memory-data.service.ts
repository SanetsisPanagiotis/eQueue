import { InMemoryDbService} from 'angular-in-memory-web-api';

import { Book } from './book';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const books: Book[] = [
      { id: 11, title: 'Infinite', pub_year: 1996, grade: 1, address: 'athens', about: 'nada', availability: 10, url: ''},
      { id: 12, title: 'Oblivion', pub_year: 2004, grade: 1 , address: 'athens', about: 'nada', availability: 10, url: ''},
      { id: 13, title: 'Ulysses', pub_year: 1922, grade: 1 , address: 'athens', about: 'nada', availability: 10, url: ''},
      { id: 14, title: 'The Crying of Lot 49', pub_year: 1966 , grade: 1, address: 'athens', about: 'nada', availability: 10, url: ''},
      { id: 15, title: 'City on Fire', pub_year: 2015 , grade: 1, address: 'athens', about: 'nada', availability: 10, url: ''},
      { id: 16, title: 'The Narrow Road to the Deep North', pub_year: 2013 , grade: 1, address: 'athens', about: 'nada', availability: 10, url: ''},
      { id: 17, title: 'The Dispossessed', pub_year: 1974, grade: 1 , address: 'athens', about: 'nada', availability: 10, url: ''},
      { id: 18, title: 'The Left Hand of Darkness', pub_year: 1969, grade: 1 , address: 'athens', about: 'nada', availability: 10, url: ''},
      { id: 19, title: 'A Death in the Family: My Struggle Book 1',
        pub_year: 2013, grade: 1 , address: 'athens', about: 'nada', availability: 10, url: ''},
      { id: 20, title: 'A Man in Love: My Struggle Book 2', pub_year: 2013 , grade: 1, address: 'athens', about: 'nada', availability: 10, url: ''}
    ];
    return {books};
  }
}
