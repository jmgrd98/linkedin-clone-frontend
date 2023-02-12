import { getTestBed } from '@angular/core/testing';
import { IonInfiniteScroll } from '@ionic/angular';
import { PostService } from './../../services/post.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from '../../models/Post';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
})
export class AllPostsComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll:IonInfiniteScroll = {};

  queryParams:string = '';
  allLoadedPosts: Post[] = [];
  numberOfPosts: number = 5;
  skipPosts: number = 0;

  constructor(private postService:PostService) { }

  ngOnInit() {}

  getPosts(event:any){
    if(this.skipPosts === 20){
      event.target.disabled = true;
    }
    this.queryParams = `?take=${this.numberOfPosts}&skip=${this.skipPosts}`;
    this.postService.getSelectedPost(this.queryParams).subscribe((posts:Post[]) => {
      for(let i = 0; i < posts.length; i++){
        this.allLoadedPosts.push(posts[i]);
      }
    })
  }

  loadData(event:any){
    return this.getPosts(event);
  }

}
