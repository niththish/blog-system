export interface PollResponse {
  data: Poll[];
}

export interface Poll {
  _id: string;
  question: string;
  image_url: string;
  option1: string;
  option2: string;
  option1Count: Number;
  option2Count: Number;
}
