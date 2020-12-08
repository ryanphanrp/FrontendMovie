export interface IMovie {
  title: string;  // ten phim
  _id: string;
  slug: string;
  year: number; // nam phat hanh
  kind: string; // the loai
  category: string[]; // phan loai
  description: string; // mo ta
  source: string[]; // link source phim
  poster: string; // anh poster ngoai
  imageSource: string; // anh thumbnail
  dateUpload: string; // ngay upload
}

export interface ICategory {
  id: string;
  name: string; // em lấy danh sách cái cates này, mỗi cái có cái name này
  title: string;
  movies: IMovie[]; // cái này từ api là rỗng
}

