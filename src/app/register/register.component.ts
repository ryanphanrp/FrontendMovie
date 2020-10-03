import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  payload: any = {}
  failed_message = ''
  isSuccessful = false;
  isFailed = false;

  // forms
  hide = true;
  passwordPattern = /^(?=.*[!@#$%^&*]+)[a-zA-Z0-9!@#$%^&*]{6,32}$/;

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.register(this.payload).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isFailed = false;
      },
      err => {
        this.isFailed = true;
        this.failed_message = err.error.message;
        this.openSnackBar(this.failed_message);
      }
    )
  }

  // snackBar
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }

}
