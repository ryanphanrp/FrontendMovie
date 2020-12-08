import {Component, OnInit} from '@angular/core';
import {IMovie} from '../../_shared/movie';
import {MovieService} from '../../_services/movie.service';
import {AdminService} from '../../_services/admin.service';
import {IUser} from '../../_shared/user';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  i = 0;
  editId: string | null = null;
  listOfData: IUser[] = [];

  // for edit
  isEdit = false;
  isOkLoading = false;
  itemToEdit: IUser;
  slug: string;

  // for create
  isCreate = false;

  constructor(
    private movieService: MovieService,
    private adminService: AdminService) {
  }

  deleteRow(id: string): void {
    console.log(id);
    this.adminService.deleteUser(id).subscribe(data => {
        console.log(data);
        this.listOfData = this.listOfData.filter(d => d.id !== id);
      },
      err => {
        console.log('ERROR: Cant delete!');
      });
  }

  ngOnInit(): void {
    this.adminService.getUsers().subscribe(
      data => {
        this.listOfData = data.data;
      }
    );
  }

  // Edit Movie
  showEdit(user: IUser): void {
    this.itemToEdit = user;
    this.isEdit = true;
  }

  hideEdit(isHide: boolean): void {
    this.isEdit = false;
  }

  // Create Movie
  showCreate(): void {
    this.isCreate = true;
  }

  hideCreate(isHide: boolean): void {
    this.isCreate = false;
  }

}
