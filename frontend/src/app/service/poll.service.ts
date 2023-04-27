import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PollResponse, Poll, Comment } from '../interface/poll.interface';

@Injectable({
  providedIn: 'root',
})
export class PollService {
  constructor(private http: HttpClient) {}

  uploadPoll(data: FormData) {
    const url = `${environment.api_url}/admin/new-poll`;
    return this.http.post(url, data);
  }

  getPolls(): Observable<PollResponse> {
    const url = `${environment.api_url}/admin/polls`;
    return this.http.get<PollResponse>(url);
  }

  addComment(id: string, data: Comment) {
    const url = `${environment.api_url}/poll/${id}/comment`;
    return this.http.patch(url, data);
  }

  getUserPolls(): Observable<PollResponse> {
    const url = `${environment.api_url}/polls`;
    return this.http.get<PollResponse>(url);
  }

  getSinglePoll(id: string) {
    const url = `${environment.api_url}/poll/${id}`;
    return this.http.get(url);
  }

  votePoll(id: string, option: number) {
    const url = `${environment.api_url}/poll/${id}`;
    return this.http.patch(url, { option });
  }

  isVoted(id: string) {
    const url = `${environment.api_url}/poll/verify/${id}`;
    return this.http.get(url);
  }

  deletePoll(_id: string) {
    const url = `${environment.api_url}/admin/poll/${_id}`;
    return this.http.delete(url);
  }
}
