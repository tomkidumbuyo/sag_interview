import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/book/';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {}

  getAllBooks() {
    return this.http.get<any[]>(API_URL);
  }

  createBook(book: {name: string, authors: string[]}) {
    return this.http.post<any>(API_URL + 'create',book);
  }

  updateBook(book: {_id: string, name: string, authors: string[]}) {
    return this.http.put(API_URL + book._id, book);
  }

  deleteBook(id: string) {
    return this.http.delete(API_URL + id);
  }

  getbookById(id: string) {
    return this.http.get(API_URL + id);
  }

}
