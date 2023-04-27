import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { PollService } from 'src/app/service/poll.service';

@Component({
  selector: 'app-new-poll',
  templateUrl: './new-poll.component.html',
  styleUrls: ['./new-poll.component.css'],
})
export class NewPollComponent implements OnInit {
  url!: string | ArrayBuffer;
  file!: File;
  pollForm: FormGroup;
  uploadStatus!: string;
  errorStatus!: string;
  totalOption!: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private pollService: PollService
  ) {
    this.pollForm = this.fb.group({
      question: [, Validators.required],
      option1: [, Validators.required],
      option2: [, Validators.required],
      option3: [],
      option4: [],
      image: [null],
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
  }

  totalOptions(e: any) {
    this.totalOption = parseInt(e.value);
  }

  onChange(event: any) {
    this.file = event.target.files[0];
    this.pollForm.patchValue({ image: this.file });

    var reader = new FileReader();
    reader.readAsDataURL(this.file);

    reader.onload = (_event) => {
      this.url = reader.result ?? '';
    };
  }

  uploadPoll() {
    const { question, option1, option2, option3, option4, image } =
      this.pollForm.value;
    const formData = new FormData();
    formData.append('question', question);
    formData.append('option1', option1);
    formData.append('option2', option2);
    formData.append('option3', option3);
    formData.append('option4', option4);
    formData.append('type', 'poll');
    formData.append('image', image);

    this.pollService.uploadPoll(formData).subscribe({
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

    this.pollForm.reset();
    this.url = '';
  }
}
