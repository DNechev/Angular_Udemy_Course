import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { PostModel } from './post.model';
import { Subject, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostService {
  private postRequestsUrl = 'https://angular-course-project-10d0c-default-rtdb.firebaseio.com/posts.json';
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string): void {
    const postData: PostModel = {title, content};

    this.http.post(this.postRequestsUrl, postData).subscribe( responseData => {
      console.log(responseData);
    }, error => {
      this.error.next('Error status: ' + error.status + ', ' + 'Error message: ' + error.statusText);
    });
  }

  fetchPosts(): any {
    return this.http.get<{[key: string]: PostModel}>(this.postRequestsUrl, {
      headers: new HttpHeaders({
        CustomHeader: 'Hello'
      }),
      params: new HttpParams().set('print', 'pretty')
    })
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

  clearPosts(): any {
    return this.http.delete(this.postRequestsUrl);
  }
}
