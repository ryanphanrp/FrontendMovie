import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../_services/auth.service';
import {AdminService} from '../../../_services/admin.service';
import {MovieService} from '../../../_services/movie.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {ICategory, IMovie} from '../../../_shared/movie';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit, OnChanges {

  @Input() movie: IMovie;
  @Input() isVisible = false;
  @Output() isHide = new EventEmitter<boolean>();
  slug = 'testvailon';

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

    // send data to server
    value.category = this.selectedTags.map(val => val.name).toString();
    this.adminService.updateMovie(this.movie?._id, value).subscribe(data => {
        this.notification.create('success', 'SUCCESS', 'Cập nhật phim thành công!');
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


  // Clear value in form
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
  }

  // Validate confirm password
  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }


  ngOnChanges(changes: SimpleChanges): void {
    const key = 'movie';
    if (changes[key]) {
      if (changes.movie.currentValue) {
        this.movie = changes.movie.currentValue;
        const item = {
          title: this.movie?.title,
          kind: this.movie?.kind,
          year: this.movie?.year,
          category: this.movie?.category.toString(),
          source: this.movie?.source,
          poster: this.movie?.poster,
          imageSource: this.movie?.imageSource,
          dateUpload: this.movie?.dateUpload,
          description: this.movie?.description
        };
        this.selectedTags = this.hotTags.filter(val => this.movie?.category.includes(val.name));
        this.validateForm.patchValue(item);
      }
    }
  }


  ngOnInit(): void {
    this.movieService.getCategories().subscribe(
      data => {
        this.hotTags = data;
      }
    );
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isHide.emit(false);
  }

}
