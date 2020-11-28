import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../_services/auth.service';
import {AdminService} from '../../../_services/admin.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {ICategory} from '../../../_shared/movie';
import {MovieService} from '../../../_services/movie.service';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {

  validateForm: FormGroup;
  @Input() isVisible = false;

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
      title: ['',
        [Validators.required]
      ],
      year: ['',
        [Validators.required]
      ],
      kind: ['',
        [Validators.required]
      ],
      category: ['',
        [Validators.required]
      ],
      source: ['',
        [Validators.required]
      ],
      poster: ['',
        [Validators.required]
      ],
      imageSource: ['',
        [Validators.required]
      ],
      dateUpload: [null,
        [Validators.required]
      ],
      description: ['',
        [Validators.required]
      ],
    });
    this.movieService.getCategories().subscribe(
      data => this.hotTags = data
    );
  }

  handleChange(checked: boolean, tag: ICategory): void {
    if (checked) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    }
    console.log('You are interested in: ', this.selectedTags);
  }

  // Submit
  submitForm(value: {
    title: string,
    kind: string,
    year: string,
    category: string,
    source: string,
    poster: string,
    imageSource: string,
    dateUpload: string,
    description: string
  }): void {
    console.log('before: ' + value);
    value.category = this.selectedTags.map(val => val.name).toString();
    console.log(value);
    this.adminService.createMovie(value).subscribe(data => {
        this.notification.create('success', 'SUCCESS', 'Thêm phim thành công!');
        setTimeout(() => {
          this.isVisible = false;
        }, 150);
      },
      err => {
        this.notification.create('error', 'ERROR', err.error.message);
      });
  }


  // Clear value in form
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
  }

  // Validate confirm password
  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }


  ngOnInit(): void {
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
