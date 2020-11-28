import {Component, OnInit} from '@angular/core';
import {UserService} from '../../_services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
  user: any;
  isChangePassword = false;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      map(pramas => pramas.get('username')),
      switchMap(username => this.userService.findUserByID(username))
    ).subscribe(item => this.user = item);
  }

  backToList(): void {
    // this.router.navigate(['/profile']);
    this.userService.findUserByID('tinhtute').subscribe(
      data => console.log(data)
    );
  }

  showModalChangePassword(): void {
    this.isChangePassword = true;
  }

}
