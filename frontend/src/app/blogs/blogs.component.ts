import { Component, OnInit } from '@angular/core';
import { BlogService } from '../service/blog.service';
import { Blog } from '../interface/blog.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  Blogs!: Blog[];
  blogs!: Blog[];
  filterBlogs: FormGroup;

  constructor(
    private blogService: BlogService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.filterBlogs = fb.group({
      selectValue: ['all'],
    });
  }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs() {
    this.blogService.getUserBlogs().subscribe({
      next: (resp) => {
        this.Blogs = resp.data;
        this.blogs = this.Blogs;
      },
    });
  }

  openBlog(id: string, blog: Blog) {
    this.router.navigate(['/blog', id], { state: blog });
  }

  filter() {
    const filterVal = this.filterBlogs.get('selectValue')?.value;
    if (filterVal === 'all') this.blogs = this.Blogs;
    else this.blogs = this.Blogs.filter((blog) => blog.category === filterVal);
  }
}
