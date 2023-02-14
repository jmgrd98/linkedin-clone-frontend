import { IonInfiniteScroll, InfiniteScrollCustomEvent, IonInfiniteScrollContent } from '@ionic/angular';
import { PostService } from './../../services/post.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from '../../models/Post';
import { Event } from 'ionicons/dist/types/stencil-public-runtime';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
})
export class AllPostsComponent implements OnInit{

  @ViewChild('infiniteScroll', {read: IonInfiniteScroll})

  queryParams:string = '';
  allLoadedPosts: Post[] = [];
  numberOfPosts: number = 5;
  skipPosts: number = 0;

  constructor(
    private postService:PostService,
    ) { }

  ngOnInit() {
    this.getPosts(false, '');
  }

  getPosts(isInitialLoad:boolean, event:any){
    if(this.skipPosts === 20){
      event.target.disabled = true;
    }
    this.queryParams = `?take=${this.numberOfPosts}&skip=${this.skipPosts}`;
    this.postService.getSelectedPost(this.queryParams).subscribe((posts:Post[]) => {
      for(let i = 0; i < posts.length; i++){
        this.allLoadedPosts.push(posts[i]);
      }
      if(isInitialLoad) event.target.complete();
      this.skipPosts = this.skipPosts + 5;
    }, (error) => {
      console.log(error);
    })
  }

  loadData(event:any){
   this.getPosts(true, event);
  }

}
