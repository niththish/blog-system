import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Blog } from '../interface/blog.interface';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.css'],
})
export class SingleBlogComponent implements OnInit {
  blog!: Blog;
  constructor(private location: Location) {}

  ngOnInit(): void {
    this.blog = <Blog>this.location.getState();
  }
}
