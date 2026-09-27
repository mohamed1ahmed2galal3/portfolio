export type Category = "BACKEND" | "FRONTEND" | "PROBLEM_SOLVING";
export type ItemType = "PROJECT" | "LEARNING_NOTE";
export type Status = "DRAFT" | "PUBLISHED";

export interface Item {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  category: Category;
  type: ItemType;
  technologies: string[];
  thumbnailUrl: string | null;
  githubUrl: string | null;
  demoUrl: string | null;
  status: Status;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}
