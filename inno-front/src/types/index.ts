export interface UserLogin {
    email: string;
    password: string;
}

export interface UserRegister {
    name: string;
    email: string;
    password: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    categories: Categorie[];
    sources: Source[];
    authors: Author[];
    created_at: Date;
    updated_at: Date;
}

export interface Categorie{
    id: number;
    name: string;
}

export interface Source{
    id: number;
    name: string;
}

export interface Author{
    id: number;
    name: string;
}

export interface IUpdatePreferences {
    categories: number[];
    sources: number[];
    authors: number[];
}

export interface IArticle {
    id: number;
    title: string;
    description: string;
    url: string;
    image_url: string | null;
    published_at: string;
    created_at: string;
    updated_at: string;
    categories: Categorie[];
    source: Source;
    author: Author;
}

export interface ArticleResponse {
    articlesNumber: number;
    articles: IArticle[];
}

export interface IArticleSearch {
     query: string; // search query
    category: string; // comma separated list of categories ids
    source: string; // comma separated list of sources ids
    from: string; // YYYY-MM-DD
    to: string;  // YYYY-MM-DD
}

export interface IFilterOptions {
    categories: Categorie[];
    sources: Source[];
    authors: Author[];
}
