import { Component, OnInit } from '@angular/core';
import {MovieService} from '../../_services/movie.service';
import {AdminService} from '../../_services/admin.service';
import {ICategory} from '../../_shared/movie';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {

  i = 0;
  editId: string | null = null;
  listOfData: ICategory[] = [];

  // for edit
  isEdit = false;
  isOkLoading = false;
  itemToEdit: ICategory;
  slug: string;

  // for create
  isCreate = false;

  constructor(
    private movieService: MovieService,
    private adminService: AdminService) {
  }

  deleteRow(id: string): void {
    this.adminService.deleteMovie(id).subscribe(data => {
      console.log('xoa thanh cong');
      this.listOfData = this.listOfData.filter(d => d.name !== id);
    });
  }

  ngOnInit(): void {
    this.adminService.getCategories().subscribe(
      data => {
        this.listOfData = data;
      }
    );
  }

  // Edit Movie
  showEdit(slug: string): void {
    this.slug = slug;
    this.isEdit = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isEdit = false;
      this.isOkLoading = false;
    }, 3000);
  }

  // Create Movie
  showCreate(): void {
    this.isCreate = true;
  }

}
