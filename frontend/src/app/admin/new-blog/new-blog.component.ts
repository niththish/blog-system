import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/service/blog.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css'],
})
export class NewBlogComponent implements OnInit {
  blogForm: FormGroup;
  file!: File;
  url!: string | ArrayBuffer;
  uploadStatus!: string;
  errorStatus!: string;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private blogService: BlogService
  ) {
    this.blogForm = fb.group({
      title: [, Validators.required],
      category: ['news', Validators.required],
      content: [, Validators.required],
      image: [null],
    });
  }

  get title() {
    return this.blogForm.get('title');
  }

  get category() {
    return this.blogForm.get('category');
  }

  get content() {
    return this.blogForm.get('content');
  }

  uploadBlog() {
    const { title, category, content, image } = this.blogForm.value;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('content', content);
    formData.append('type', 'blog');
    formData.append('image', image);

    this.blogService.uploadBlog(formData).subscribe({
      next: (data: any) => {
        this.uploadStatus = data.status;
        setTimeout(() => {
          this.uploadStatus = '';
        }, 2500);
      },
      error: (err) => {
        this.errorStatus = 'unable to post a blog try reducing image size';
        setTimeout(() => {
          this.errorStatus = '';
        }, 3500);
      },
    });
    this.blogForm.reset();
    this.url = '';
  }

  onChange(event: any) {
    this.file = event.target.files[0];
    this.blogForm.patchValue({ image: this.file });

    var reader = new FileReader();
    reader.readAsDataURL(this.file);

    reader.onload = (_event) => {
      this.url = reader.result ?? '';
    };
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
  }
}
