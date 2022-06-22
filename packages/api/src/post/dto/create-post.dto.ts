export class CreatePostDto {
  title: string;
  content: string;
  slug: string;
  images: string[];
  tags: string[];
  author: string;
}
