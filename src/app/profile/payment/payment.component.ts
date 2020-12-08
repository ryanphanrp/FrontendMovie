import {Component, OnInit} from '@angular/core';
import {map, switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../_services/auth.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {UserService} from '../../_services/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  query: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    public userService: UserService,
    private router: Router,
    private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    const query = this.router.url.substring(17);
    this.userService.returnPayment(query).subscribe(
      data => {
        this.notification.create('success', 'SUCCESS', 'Thanh toán thành công!!!');
      },
      err => {
        this.notification.create('error', 'ERROR', err.error.message);
      }
    );
  }
}
