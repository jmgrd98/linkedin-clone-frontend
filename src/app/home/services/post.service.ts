import { Post } from './../models/Post';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getSelectedPost(params:any){

    return this.http.get<Post[]>(
      `${environment.baseApiUrl}/feed${params}`);
  }


}
