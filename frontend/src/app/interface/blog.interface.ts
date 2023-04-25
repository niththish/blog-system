export interface BlogResponse {
  data: Blog[];
}

export interface Blog {
  _id: string;
  title: string;
  category: string;
  image_url: string;
  content: string;
}
