import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { BookService } from '../_services/book.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { NewBookDialog } from './newBookDialog/new-book-dialog';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books: any[] = [];
  isLoggedIn: boolean = false;

  constructor(private bookService: BookService, private authService: AuthService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.bookService.getAllBooks().subscribe({
      next: data => {
        this.books = data;
      },
      error: err => {
        let errorMessage = ''
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            errorMessage = res.message;
          } catch {
            errorMessage = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          errorMessage = `Error with status: ${err.status}`;
        }
        this.snackBar.open(errorMessage, 'Close', {
          duration: 30000
        });
      }
    });
  }

  newBookDialog(book?: {_id: string, name: string, authors: string[]}): void {
      const dialogRef = this.dialog.open(NewBookDialog, {
        width: '250px',
        data: book,
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result)
        // this.book = result;
      });
    }
  
}
