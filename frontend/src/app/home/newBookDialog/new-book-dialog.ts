import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'new-book-dialog',
  templateUrl: 'new-book-dialog.html',
})
export class NewBookDialog {
  book?: {
    _id: string, name: string, authors: [string]
  }

  constructor(
    public dialogRef: MatDialogRef<NewBookDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {_id: string, name: string, authors: [string]},
  ) {
    if(data) {

    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave() {
    
  }
}
