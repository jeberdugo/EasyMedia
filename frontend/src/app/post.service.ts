import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  getPosts(){
    const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    return this.httpClient.get(`${this.url}/post`, { headers });
  }

  getPostsByIdAndDate( date:string){
    const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    if(date){
    return this.httpClient.get(`${this.url}/post/fecha/${date}`, { headers });}
    else{
      return this.httpClient.get(`${this.url}/post/fecha/null`, { headers });
    }
  }

  getPostsByWordAndDate(word: string, date:string){
    return this.httpClient.get(`${this.url}/post/${word}/${date}`);
  }

  createPost(title: string, content: string): Observable<any> {
    const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    const userData = { title, content };
    return this.httpClient.post<any>(`${this.url}/post`, userData, { headers });
  }
}
