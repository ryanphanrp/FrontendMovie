import {Component, OnInit} from '@angular/core';
import {IMovie} from '../../_shared/movie';
import {MovieService} from '../../_services/movie.service';
import {AdminService} from '../../_services/admin.service';

@Component({
  selector: 'app-admin-payment',
  templateUrl: './admin-payment.component.html',
  styleUrls: ['./admin-payment.component.css']
})
export class AdminPaymentComponent implements OnInit {

  i = 0;
  editId: string | null = null;
  listOfData: any[] = [];

  // for edit
  isEdit = false;
  isOkLoading = false;
  slug: string;

  // for create
  isCreate = false;

  constructor(
    private movieService: MovieService,
    private adminService: AdminService) {
  }

  deleteRow(id: string): void {
    this.adminService.deletePayment(id).subscribe(data => {
      console.log('xoa thanh cong');
      this.listOfData = this.listOfData.filter(d => d._id !== id);
    });
  }

  ngOnInit(): void {
    this.adminService.getPaymentList().subscribe(
      data => {
        this.listOfData = data;
      }
    );
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isEdit = false;
      this.isOkLoading = false;
    }, 3000);
  }

}
