import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PostModel } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  isFetching = false;
  error = null;
  @ViewChild('postForm') form: NgForm;
  private errorSub: Subscription;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.subscribeToFetchPostsObservable();
    this.errorSub = this.postService.error.subscribe( (error) => {
      this.error = error;
    });
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  onCreatePost(postData: PostModel) {
    // Send Http request
    this.postService.createAndStorePost(postData.title, postData.content);
    this.form.reset();
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
    }, error => {
      console.log(error);
      this.loadedPosts = [];
      this.isFetching = false;
      this.error = 'Error status: ' + error['status'] + ', ' + 'Error message: ' + error['statusText'];
    });
  }
}
