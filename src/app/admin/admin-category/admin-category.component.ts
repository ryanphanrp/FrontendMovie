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
    this.adminService.deleteCategory(id).subscribe(data => {
      console.log('xoa thanh cong');
      this.listOfData = this.listOfData.filter(d => d.id !== id);
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
  showEdit(data: ICategory): void {
    this.itemToEdit = data;
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
