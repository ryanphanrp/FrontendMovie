import {Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {IUser} from '../_shared/User';
import {NzDescriptionsSize} from 'ng-zorro-antd/descriptions';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: IUser;
  isVisible = false;
  isVisibleInfo = false;
  size: NzDescriptionsSize = 'default';


  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getInformation().subscribe(
      data => {
        this.currentUser = data;
      },
      error => {
        console.log(error.error.message);
      }
    );
  }

  showChangePassword(): void {
    this.isVisible = true;
  }

  showChangeInfo(): void {
    this.isVisibleInfo = true;
  }

  payment(): void {
    this.userService.createPayment().subscribe(
      data => {
        window.open(data.data, '_blank');
      }
    );
  }

}
