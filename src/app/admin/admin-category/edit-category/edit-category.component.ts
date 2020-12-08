import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../_services/auth.service';
import {AdminService} from '../../../_services/admin.service';
import {MovieService} from '../../../_services/movie.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {ICategory} from '../../../_shared/movie';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnChanges {


  validateForm: FormGroup;
  @Input() isVisible = false;
  @Input() thisCate: ICategory;
  @Output() isHide = new EventEmitter<boolean>();

  // Constructor
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private adminService: AdminService,
    private movieService: MovieService,
    private notification: NzNotificationService) {

  }

  // Submit
  submitForm(value: {
    category: string,
  }): void {
    const item = {
      category: value.category,
      id: this.thisCate.id
    };
    this.adminService.updateCategory(item).subscribe(data => {
        this.notification.create('success', 'SUCCESS', 'Cập nhật thể loại thành công!');
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
    // create reactive form
    this.validateForm = this.fb.group({
      category: ['',
        [Validators.required]
      ]
    });
    setTimeout(() => {
      this.validateForm.patchValue({
        category: this.thisCate.title
      });
    }, 15000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const key = 'thisCate';
    if (changes[key]) {
      if (changes.thisCate.currentValue) {
        this.thisCate = changes.thisCate.currentValue;
        this.validateForm.patchValue({category: this.thisCate.title});
      }
    }
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isHide.emit(false);
  }
}
