import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ICategory} from '../../../_shared/movie';
import {AuthService} from '../../../_services/auth.service';
import {AdminService} from '../../../_services/admin.service';
import {MovieService} from '../../../_services/movie.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {


  validateForm: FormGroup;
  @Input() isVisible = false;
  @Output() isHide = new EventEmitter<boolean>();

  hotTags: ICategory[] = [];
  selectedTags: ICategory[] = [];

  // Constructor
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private adminService: AdminService,
    private movieService: MovieService,
    private notification: NzNotificationService) {
    // create reactive form
    this.validateForm = this.fb.group({
      category: ['',
        [Validators.required]
      ]
    });
  }

  // Submit
  submitForm(value: {
    category: string,
  }): void {
    this.adminService.createCategory(value).subscribe(
      data => {
        this.notification.create('success', 'SUCCESS', 'Thêm thể loại thành công!');
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

  ngOnInit(): void {
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isHide.emit(false);
  }

}
