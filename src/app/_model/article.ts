// export interface Article {
//   id: string;
//   title: string;
//   autor: string;
//   content: string;
//   image: string;
//   created_at: string;
//   updated_at: string;

import { environment } from "../../environments/environment";

// }
export class Article {
  id: string;
  title: string;
  autor: string;
  description: string;
  content: string;
  image: string;
  created_at: string;
  updated_at: string;
  constructor(
    id: string,
    title: string,
    autor: string,
    content: string,
    image: string,
    description: string,
    created_at: string,
    updated_at: string
  ) {
    this.id = id;
    this.title = title;
    this.autor = autor;
    this.content = content;
    this.description = description;
    this.image = `${environment.baseUrl}uploads/${image}`;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
