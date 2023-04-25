import { Component, OnInit } from '@angular/core';
import { PollService } from '../service/poll.service';
import { ActivatedRoute } from '@angular/router';
import { Poll } from '../interface/poll.interface';

@Component({
  selector: 'app-single-poll',
  templateUrl: './single-poll.component.html',
  styleUrls: ['./single-poll.component.css'],
})
export class SinglePollComponent implements OnInit {
  selectedOption!: number;
  isVotedSelected: boolean = false;
  voted: boolean = false;
  poll!: Poll;

  constructor(
    private pollService: PollService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getSinglePoll();
    this.isVoted();
  }

  getSinglePoll() {
    const { id } = this.route.snapshot.params;
    this.pollService.getSinglePoll(id).subscribe({
      next: (resp: any) => {
        this.poll = resp.data;
      },
      error: (err) => {},
    });
  }

  setSelected(option1: HTMLElement, option2: HTMLElement, selected: number) {
    this.selectedOption = selected;
    this.isVotedSelected = true;
    option1.classList.add('selected');
    option2.classList.remove('selected');
  }

  vote(_id: string) {
    this.pollService.votePoll(_id, this.selectedOption).subscribe({
      next: (resp) => {
        this.voted = true;
        this.getSinglePoll();
      },
      error: (err) => {},
    });
  }

  isVoted() {
    const { id } = this.route.snapshot.params;
    this.pollService.isVoted(id).subscribe({
      next: (resp: any) => {
        const status = resp.status;
        if (status) this.voted = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  share(_id: string) {
    const url = `${window.location.href}/${_id}`;
    const link = `https://wa.me/?text=${url}`;
    window.open(link, '_blank');
  }
}
