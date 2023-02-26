import { Post } from './../models/Post';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../../environments/environment";
import {take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  private httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getSelectedPost(params:any){

    return this.http.get<Post[]>(
      `${environment.baseApiUrl}/feed${params}`);
  }

  createPost(body: string) {
    return this.http.post<Post>(`${environment.baseApiUrl}/feed`, { body }, this.httpOptions)
      .pipe(
      take(1)
    );
  }

  updatePost(body: string, postId: number) {
    return this.http.put<Post>(`${environment.baseApiUrl}/feed${postId}`, { body }, this.httpOptions)
      .pipe(
        take(1)
      );
  }

  deletePost(postId: number) {
    return this.http.delete<Post>(`${environment.baseApiUrl}/feed${postId}`, this.httpOptions)
      .pipe(
        take(1)
      );
  }

}
