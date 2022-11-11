import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { BookService } from '../_services/book.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatChipInputEvent} from '@angular/material/chips';


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
    this.fetchBooks()
  }

  fetchBooks() {
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
        width: '500px',
        data: book,
      });

      dialogRef.afterClosed().subscribe(result => {
        this.fetchBooks()
      });
    }

    deleteBook(bookId: string): void {
      this.bookService.deleteBook(bookId).subscribe({
        next: data => {
          this.snackBar.open("Book successfully deleted", 'Close', {
            duration: 30000
          });
          this.fetchBooks()
        },
        error: err => {
          this.snackBar.open("Error deleting book", 'Close', {
            duration: 30000
          });
          this.fetchBooks()
        }
      })
    }

}

@Component({
  selector: 'new-book-dialog',
  templateUrl: 'new-book-dialog.html',
})

export class NewBookDialog {
  book: {
    _id?: string, name: string, authors: string[]
  } = {
    name: "",
    authors: []
  }

  constructor(
    public dialogRef: MatDialogRef<NewBookDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {_id: string, name: string, authors: [string]},
    private bookService: BookService,
  ) {
    if(data) {
      this.book = data
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addKeywordFromInput(event: MatChipInputEvent) {
    if (event.value) {
      this.book.authors.push(event.value);
      event.chipInput!.clear();
    }
  }

  removeKeyword(keyword: string) {
    this.book.authors.splice(this.book.authors.indexOf(keyword),1);
  }

  onSave(): void{
    this.bookService.createBook(this.book).subscribe({
      next: data => {
        this.dialogRef.close();
      },
      error: err => {
      }
    })
  }
}
