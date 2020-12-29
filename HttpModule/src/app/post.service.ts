import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PostModel } from './post.model';

@Injectable({providedIn: "root"})
export class PostService {
  private postRequestsUrl = 'https://angular-course-project-10d0c-default-rtdb.firebaseio.com/posts.json';

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: PostModel = {title: title, content: content};

    this.http.post(this.postRequestsUrl, postData).subscribe( responseData => {
      console.log(responseData);
    });
  }

  fetchPosts() {
    return this.http.get<{[key: string]: PostModel}>(this.postRequestsUrl)
    .pipe(map( (responseData) => {
      const postsArray: PostModel[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postsArray.push({...responseData[key], id: key});
        }
      }
      console.log(postsArray);
      return postsArray;
    })
    );
  }

  clearPosts() {
    return this.http.delete(this.postRequestsUrl);
  }
}
