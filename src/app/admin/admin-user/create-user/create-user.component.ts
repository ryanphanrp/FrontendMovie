import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../_services/auth.service';
import {AdminService} from '../../../_services/admin.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  validateForm: FormGroup;
  @Input() isVisible = false;
  @Output() isHide = new EventEmitter<boolean>();

  // Constructor
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private adminService: AdminService,
    private notification: NzNotificationService) {
  }

  // Submit
  submitForm(value: {
    email: string,
    nickname: string,
    password: string,
  }): void {
    this.adminService.createUser(value).subscribe(data => {
        this.notification.create('success', 'SUCCESS', 'Thêm thành viên thành công!');
        setTimeout(() => {
          this.isVisible = false;
          this.isHide.emit(false);
          window.location.reload();
        }, 150);
      },
      err => {
        this.notification.create('error', 'ERROR', err.error.message);
      });
  }


  // Validate confirm password
  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }


  ngOnInit(): void {
    // create reactive form
    this.validateForm = this.fb.group({
      email: ['',
        [Validators.required, Validators.email]
      ],
      nickname: ['',
        [Validators.required]
      ],
      password: ['',
        [Validators.required]
      ]
    });
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isHide.emit(false);
  }
}
