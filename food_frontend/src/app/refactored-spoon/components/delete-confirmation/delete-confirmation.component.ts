import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { filter, first } from 'rxjs/operators';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent {
	@Output() delete = new EventEmitter<boolean>();

  constructor(public dialog: MatDialog) { }

	openDialog(): void {
		// const dialogConfig = new MatDialogConfig();

		// dialogConfig.disableClose = true;
		// dialogConfig.data = {action: "delete"};
		
		// this.dialog.open(ConfirmationDialogComponent, dialogConfig);
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {width: '250px', data: {action: 'delete'}});

		// const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

		// dialogRef.afterClosed().subscribe(
		// 	data => {
		// 		console.log("after closed: data");
		// 		console.log(data);
		// 		if (data) {
		// 			this.delete.emit(data);
		// 		}
		// 	}
		// );

		dialogRef.afterClosed().pipe(first(), filter(Boolean)).subscribe(
			data => {
				/*console.log("after closed: data");
				console.log(data);
				if (data) {
					this.delete.emit(data);
				}*/
				this.delete.emit(data);
			}
		);
	}
}
