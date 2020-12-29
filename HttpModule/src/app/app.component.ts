import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PostModel } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  private postRequestsUrl = 'https://angular-course-project-10d0c-default-rtdb.firebaseio.com/posts.json';
  isFetching = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onCreatePost(postData: PostModel) {
    // Send Http request
    this.http.post(this.postRequestsUrl, postData).subscribe( responseData => {
      console.log(responseData);
    });
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http.get<{[key: string]: PostModel}>(this.postRequestsUrl)
    .pipe(map( (responseData) => {
      const postsArray: PostModel[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postsArray.push({...responseData[key], id: key});
        }
      }
      console.log(postsArray);
      return postsArray;
    }))
    .subscribe( responseData => {
      this.isFetching = false;
      this.loadedPosts = responseData;
    });
  }
}
