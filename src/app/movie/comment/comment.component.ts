import {Component, Input, OnInit} from '@angular/core';
import {MovieService} from '../../_services/movie.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  commentList: any[] = [];
  submitting = false;
  user = {
    name: 'Tester',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  };
  @Input() movieID: string;
  inputValue = '';


  constructor(private movieService: MovieService) {
  }


  ngOnInit(): void {
    this.movieService.getComment({movieID: this.movieID}).subscribe(
      data => {
        this.commentList = data;
      },
    );
  }

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.movieService.addComment({movieID: this.movieID, comment: content}).subscribe(
      data => {
        console.log('Success');
        setTimeout(() => {
          this.submitting = false;
          this.inputValue = '';
          this.commentList = [
            ...this.commentList,
            {
              userId: '3dsgsgsdghfdhdf',
              comment: content,
              movie_id: 'sdgfsdgsdgsdgg'
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
