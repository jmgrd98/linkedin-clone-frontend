import { Injectable } from '@angular/core';
import { HttpClient }

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
}
