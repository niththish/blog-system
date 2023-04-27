export interface PollResponse {
  data: Poll[];
}

export interface Comment {
  name: string;
  comment: string;
}

export interface Poll {
  _id: string;
  question: string;
  image_url: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  option1Count: Number;
  option2Count: Number;
  option3Count: Number;
  option4Count: Number;
  comments: [Comment];
}
