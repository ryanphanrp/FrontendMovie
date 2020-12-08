import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../_services/auth.service';
import {AdminService} from '../../../_services/admin.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {IUser} from '../../../_shared/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnChanges {

  validateForm: FormGroup;
  @Input() isVisible = false;
  @Input() currentUser: IUser;
  @Output() isHide = new EventEmitter<boolean>();

  // Constructor
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private adminService: AdminService,
    private notification: NzNotificationService) {
    // create reactive form
  }

  // Submit
  submitForm(value: {
    email: string,
    dateCreate: string,
    plan: string,
    nickname: string,
    password: string,
  }): void {
    this.adminService.updateUser(value).subscribe(data => {
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
    this.validateForm = this.fb.group({
      nickname: ['',
        [Validators.required]
      ],
      email: ['',
        [Validators.required, Validators.email]
      ],
      password: ['',
        [Validators.required, Validators.minLength(8)]
      ],
      dateCreate: ['',
        [Validators.required]
      ],
      plan: ['',
        [Validators.required]
      ]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const key = 'currentUser';
    if (changes[key]) {
      if (changes.currentUser.currentValue) {
        this.currentUser = changes.currentUser.currentValue;
        this.validateForm.patchValue({
          nickname: this.currentUser.nickname,
          plan: this.currentUser.plan,
          email: this.currentUser.email,
          dateCreate: this.currentUser.dateCreate
        });
      }
    }
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isHide.emit(false);
  }

}
