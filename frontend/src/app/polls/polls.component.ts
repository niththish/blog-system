import { Component, OnInit } from '@angular/core';
import { PollService } from '../service/poll.service';
import { Poll } from '../interface/poll.interface';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.css'],
})
export class PollsComponent implements OnInit {
  polls!: Poll[];

  constructor(private pollService: PollService, private router: Router) {}

  ngOnInit(): void {
    this.getPolls();
  }

  getPolls() {
    this.pollService.getUserPolls().subscribe({
      next: (resp) => {
        this.polls = resp.data;
      },
      error: (err) => {},
    });
  }

  share(_id: string) {
    const url = `${window.location.href}/${_id}`;
    const link = `https://wa.me/?text=${url}`;
    window.open(link, '_blank');
  }
}
