import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { IUser } from '../_shared/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userList: IUser[];

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(item => this.userList = item);
    this.activatedRoute.queryParamMap.subscribe(
      query => {
        const orderBy = query.get('orderby');
      }
    )
  }

}
