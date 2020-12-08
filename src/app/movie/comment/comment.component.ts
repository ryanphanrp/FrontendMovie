import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MovieService} from '../../_services/movie.service';
import {IUser} from '../../_shared/user';
import {UserService} from '../../_services/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnChanges {

  commentList: any[] = [];
  submitting = false;
  currentUser: IUser;
  avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png';
  @Input() movieID: string;
  inputValue = '';


  constructor(
    private movieService: MovieService,
    private userService: UserService) {
  }


  ngOnInit(): void {
    setTimeout(() => {
      this.movieService.getComment(this.movieID).subscribe(
        data => {
          this.commentList = data;
        },
      );
    }, 500);
    this.userService.getInformation().subscribe(
      data => {
        this.currentUser = data;
      },
      error => {
        console.log(error.error.message);
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const key = 'movieID';
    if (changes[key]) {
      this.commentList = [];
      this.movieID = changes.isLogged.currentValue;
      this.movieService.getComment(this.movieID).subscribe(
        data => {
          this.commentList = data;
        },
      );

    }
  }

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    console.log(this.movieID);
    console.log(content);
    this.movieService.addComment({movieID: this.movieID, comment: content}).subscribe(
      data => {
        console.log('Success');
        setTimeout(() => {
          this.submitting = false;
          this.inputValue = '';
          this.commentList = [
            ...this.commentList,
            {
              user: this.currentUser.nickname,
              comment: content,
              movie_id: this.movieID
            }
          ];
        }, 600);

      },
      error => {
        console.log(error.error.message);
      }
    );
  }

}
