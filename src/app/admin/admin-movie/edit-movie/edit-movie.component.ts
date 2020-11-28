import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../_services/auth.service';
import {AdminService} from '../../../_services/admin.service';
import {Router} from '@angular/router';
import {MovieService} from '../../../_services/movie.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {ICategory} from '../../../_shared/movie';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  @Input() slug: string;
  @Input() isVisible = false;

  validateForm: FormGroup;

  hotTags: ICategory[] = [];
  selectedTags: ICategory[] = [];

  // Constructor
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private adminService: AdminService,
    private movieService: MovieService,
    private notification: NzNotificationService) {
    console.log('slug on constructor:' + this.slug);
    // create reactive form
    this.validateForm = this.fb.group({
      id: ['', [Validators.required]],
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
    id: string,
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

    // send data to server
    value.category = this.selectedTags.map(val => val.name).toString();
    console.log('before: ' + this.validateForm.value);
    this.adminService.updateMovie(value).subscribe(data => {
        this.notification.create('success', 'SUCCESS', data);
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

  update(): void {
    this.movieService.findMovieBySlug(this.slug).subscribe(data => {
      console.log(this.slug);
      console.log(data);
      const item = {
        id: data._id,
        title: data.title,
        kind: data.kind,
        year: data.year,
        category: data.category.toString(),
        source: data.source,
        poster: data.poster,
        imageSource: data.imageSource,
        dateUpload: data.dateUpload,
        description: data.description
      };
      this.selectedTags = this.hotTags.filter(val => data.category.includes(val.name));
      this.validateForm.setValue(item);
    });
  }


  ngOnInit(): void {
    this.movieService.findMovieBySlug(this.slug).subscribe(data => {
      console.log(this.slug);
      console.log(data);
      this.validateForm.setValue(data);
    });
    setTimeout(() => {
      this.update();
    }, 10000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
