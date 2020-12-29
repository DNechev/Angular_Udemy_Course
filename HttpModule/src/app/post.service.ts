import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { PostModel } from './post.model';
import { Subject, throwError } from "rxjs";

@Injectable({providedIn: "root"})
export class PostService {
  private postRequestsUrl = 'https://angular-course-project-10d0c-default-rtdb.firebaseio.com/posts.json';
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: PostModel = {title: title, content: content};

    this.http.post(this.postRequestsUrl, postData).subscribe( responseData => {
      console.log(responseData);
    }, error => {
      this.error.next('Error status: ' + error['status'] + ', ' + 'Error message: ' + error['statusText']);
    });
  }

  fetchPosts() {
    return this.http.get<{[key: string]: PostModel}>(this.postRequestsUrl)
    .pipe(
      map( (responseData) => {
      const postsArray: PostModel[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postsArray.push({...responseData[key], id: key});
        }
      }
      console.log(postsArray);
      return postsArray;
    }),
      catchError( errorResponse => {
        return throwError(errorResponse);
      })
    );
  }

  clearPosts() {
    return this.http.delete(this.postRequestsUrl);
  }
}
