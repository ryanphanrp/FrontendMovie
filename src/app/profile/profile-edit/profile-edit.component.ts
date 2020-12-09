import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../_services/user.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  @Input() isVisible = false;
  validateForm: FormGroup;
  @Output() isHide = new EventEmitter<boolean>();


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private notification: NzNotificationService) {
    this.validateForm = this.fb.group({
      nickname: ['', [Validators.required]],
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  submitForm(value: { nickname: string }): void {
    this.userService.updateInformation(value).subscribe(
      data => {
        this.notification.create('success', 'SUCCESS', 'Cập nhật thành công!!!');
        window.location.reload();
      },
      err => {
        this.notification.create('error', 'ERROR', err.error.message);
      }
    );
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isHide.emit(false);
  }

  ngOnInit(): void {
  }

}
