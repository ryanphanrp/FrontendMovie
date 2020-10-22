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
    imageSource: string; // anh thumnail
    dateUpload: string; // ngay upload
}

export interface ICategory {
    name: string;
    title: string;
    movies: IMovie[];
}
