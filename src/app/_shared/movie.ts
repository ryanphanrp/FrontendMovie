export interface IMovie {
    title: string,  // ten phim
    slug: string, // slug tu title
    year: number, // nam phat hanh
    kind: string, // the loai
    category: string[], // phan loai
    description: string, // mo ta
    source: string, // link source phim
    poster: string, // anh poster ngoai
    imageSource: string, // anh thumnail
    dateUpload: string // ngay upload
}

export interface ICategory {
    kind: string,
    title: string,
    movies: IMovie[];
}