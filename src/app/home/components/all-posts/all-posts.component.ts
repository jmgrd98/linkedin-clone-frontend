import {IonInfiniteScroll} from '@ionic/angular';
import {PostService} from './../../services/post.service';
import {Component, Input, OnInit, SimpleChange, SimpleChanges, ViewChild} from '@angular/core';
import {Post} from '../../models/Post';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
})
export class AllPostsComponent implements OnInit {
  @Input() postBody?: string;
  @ViewChild('infiniteScroll', {read: IonInfiniteScroll})


  queryParams: string = '';
  allLoadedPosts: Post[] = [];
  numberOfPosts: number = 5;
  skipPosts: number = 0;

  constructor(
    private postService: PostService,
  ) {
  }

  ngOnInit() {
    this.getPosts(false, '');
  }

  ngOnChanges(changes: SimpleChanges) {
    const postBody = changes['postBody'].currentValue;
    if (!postBody) return;
    this.postService.createPost(postBody).subscribe((post: Post) => {
      this.allLoadedPosts.unshift(post);
    });
  }

  getPosts(isInitialLoad: boolean, event: any) {
    if (this.skipPosts === 20) {
      event.target.disabled = true;
    }
    this.queryParams = `?take=${this.numberOfPosts}&skip=${this.skipPosts}`;
    this.postService.getSelectedPost(this.queryParams).subscribe((posts: Post[]) => {
      for (let i = 0; i < posts.length; i++) {
        this.allLoadedPosts.push(posts[i]);
      }
      if (isInitialLoad) event.target.complete();
      this.skipPosts = this.skipPosts + 5;
    }, (error) => {
      console.log(error);
    })
  }

  loadData(event: any) {
    this.getPosts(true, event);
  }

}
