import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { NewBlogComponent } from './admin/new-blog/new-blog.component';
import { AdminBlogsComponent } from './admin/admin-blogs/admin-blogs.component';
import { BlogsComponent } from './blogs/blogs.component';
import { SingleBlogComponent } from './single-blog/single-blog.component';
import { NewPollComponent } from './admin/new-poll/new-poll.component';
import { AdminPollsComponent } from './admin/admin-polls/admin-polls.component';
import { PollsComponent } from './polls/polls.component';
import { SinglePollComponent } from './single-poll/single-poll.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'blogs',
  },
  {
    path: 'blogs',
    component: BlogsComponent,
  },
  {
    path: 'polls',
    component: PollsComponent,
  },
  {
    path: 'blog/:id',
    component: SingleBlogComponent,
  },
  {
    path: 'polls/:id',
    component: SinglePollComponent,
  },
  {
    path: 'admin',
    pathMatch: 'full',
    redirectTo: 'admin/login',
  },
  {
    path: 'admin/login',
    component: LoginComponent,
  },
  {
    path: 'admin/blogs',
    component: AdminBlogsComponent,
  },
  {
    path: 'admin/polls',
    component: AdminPollsComponent,
  },
  {
    path: 'admin/new-blog',
    component: NewBlogComponent,
  },
  {
    path: 'admin/new-poll',
    component: NewPollComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
