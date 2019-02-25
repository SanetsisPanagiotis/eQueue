import { Component, OnInit } from '@angular/core';

import { Book } from '../book';
import { BookService } from '../book.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {

  books: Book[];
    // scp -r bangular/* user@snf-862020.vm.okeanos.grnet.gr:project_site
  constructor(
    private bookService: BookService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    if(localStorage.getItem('bangular-jwt-token')){
      this.auth.isLoggedIn = true;
      this.auth.username = localStorage.getItem('username');
    }
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => this.books = books);
  }

  add(title: string, pubYearStr: string, grade: number): void {
    title = title.trim();
    if(grade==null)
      grade = 5
    let pub_year = +pubYearStr;
    if (!title || !pub_year) { return; }
    this.bookService.addBook({ title, pub_year, grade } as Book)
      .subscribe(book => {
        this.books.push(book);
      });
  }

  delete(book: Book): void {
    this.books = this.books.filter(h => h !== book);
    this.bookService.deleteBook(book).subscribe();
  }

}
