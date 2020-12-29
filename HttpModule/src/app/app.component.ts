import { Component, OnInit } from '@angular/core';
import { PostModel } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = false;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.subscribeToFetchPostsObservable();
  }

  onCreatePost(postData: PostModel) {
    // Send Http request
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.subscribeToFetchPostsObservable();
  }

  onClearPosts() {
    // Send Http request
    this.postService.clearPosts().subscribe( () => {
      this.loadedPosts = [];
    });
  }

  private subscribeToFetchPostsObservable() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe( responseData => {
      this.isFetching = false;
      this.loadedPosts = responseData;
    });
  }
}
