import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogResponse } from '../interface/blog.interface';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}

  uploadBlog(data: FormData) {
    const url = `${environment.api_url}/admin/new-blog`;
    return this.http.post(url, data);
  }

  getBlogs(): Observable<BlogResponse> {
    const url = `${environment.api_url}/admin/blogs`;
    return this.http.get<BlogResponse>(url);
  }

  getUserBlogs(): Observable<BlogResponse> {
    const url = `${environment.api_url}/blogs`;
    return this.http.get<BlogResponse>(url);
  }

  deleteBlog(_id: string) {
    const url = `${environment.api_url}/admin/blog/${_id}`;
    return this.http.delete(url);
  }
}
