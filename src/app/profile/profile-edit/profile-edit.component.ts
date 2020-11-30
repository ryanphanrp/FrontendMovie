import {Component, Input, OnInit} from '@angular/core';
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
        this.notification.create('success', 'SUCCESS', 'Register Successful!!!');
      },
      err => {
        this.notification.create('error', 'ERROR', err.error.message);
      }
    );
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  ngOnInit(): void {
  }

}
