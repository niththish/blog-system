import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './admin/login/login.component';
import { AdminNavbarComponent } from './admin/admin-navbar/admin-navbar.component';
import { NewBlogComponent } from './admin/new-blog/new-blog.component';
import { AdminBlogsComponent } from './admin/admin-blogs/admin-blogs.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BlogsComponent } from './blogs/blogs.component';
import { SingleBlogComponent } from './single-blog/single-blog.component';
import { NewPollComponent } from './admin/new-poll/new-poll.component';
import { AdminPollsComponent } from './admin/admin-polls/admin-polls.component';
import { PollsComponent } from './polls/polls.component';
import { SinglePollComponent } from './single-poll/single-poll.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, AdminNavbarComponent, NewBlogComponent, AdminBlogsComponent, NavbarComponent, BlogsComponent, SingleBlogComponent, NewPollComponent, AdminPollsComponent, PollsComponent, SinglePollComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
