import {Component, OnInit} from '@angular/core';
import {UserService} from '../../_services/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {

  }

}
