export class CreatePostDto {
  title: string;
  content: string;
  category: string;
  slug: string;
  images: string[];
  tags: string[];
  author: string;
}
