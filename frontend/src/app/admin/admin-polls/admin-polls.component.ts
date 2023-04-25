import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Poll } from 'src/app/interface/poll.interface';
import { LoginService } from 'src/app/service/login.service';
import { PollService } from 'src/app/service/poll.service';

@Component({
  selector: 'app-admin-polls',
  templateUrl: './admin-polls.component.html',
  styleUrls: ['./admin-polls.component.css'],
})
export class AdminPollsComponent implements OnInit {
  Polls!: Poll[];
  polls!: Poll[];
  constructor(
    private pollService: PollService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token: string = localStorage.getItem('token') ?? '';
    if (!token) this.router.navigate(['/admin']);

    this.loginService.isLoggedIn(token).subscribe({
      next: (data) => {
        if (data.reason) this.router.navigate(['/admin']);
      },
      error: (err) => {},
    });

    this.getPolls();
  }

  getPolls() {
    this.pollService.getPolls().subscribe({
      next: (resp) => {
        this.Polls = resp.data;
        this.polls = this.Polls;
      },
    });
  }

  deletePoll(id: string) {
    this.pollService.deletePoll(id).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.Polls = this.Polls.filter((poll) => poll._id !== id);
        this.polls = this.Polls;
      },
    });
  }
}
