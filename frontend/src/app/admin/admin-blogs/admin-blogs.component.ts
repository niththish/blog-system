import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Blog } from 'src/app/interface/blog.interface';
import { BlogService } from 'src/app/service/blog.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-admin-blogs',
  templateUrl: './admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.css'],
})
export class AdminBlogsComponent implements OnInit {
  Blogs!: Blog[];
  blogs!: Blog[];
  filterBlogs: FormGroup;

  constructor(
    private blogService: BlogService,
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {
    this.filterBlogs = fb.group({
      selectValue: ['all'],
    });
  }

  ngOnInit(): void {
    const token: string = localStorage.getItem('token') ?? '';
    if (!token) this.router.navigate(['/admin']);

    this.loginService.isLoggedIn(token).subscribe({
      next: (data) => {
        if (data.reason) this.router.navigate(['/admin']);
      },
      error: (err) => {},
    });
    this.getBlogs();
  }

  deleteBlog(id: string) {
    this.blogService.deleteBlog(id).subscribe({
      next: (resp) => {
        console.log(resp);
        this.Blogs = this.Blogs.filter((blog) => blog._id !== id);
        this.blogs = this.Blogs;
      },
    });
  }

  getBlogs() {
    this.blogService.getBlogs().subscribe({
      next: (resp) => {
        this.Blogs = resp.data;
        this.blogs = this.Blogs;
      },
    });
  }

  filter() {
    const filterVal = this.filterBlogs.get('selectValue')?.value;
    if (filterVal === 'all') this.blogs = this.Blogs;
    else this.blogs = this.Blogs.filter((blog) => blog.category === filterVal);
  }
}
