import { Post } from './../models/Post';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getSelectedPost(params){ 

    return this.http.get<Post[]>('http://localhost:3000/api/feed' + params);

  }


}
