export interface IProduct {
  id?: string | undefined;
  title: string;
  url: string;
  description: string;
  price: string;
  colors: string[];
  category: {
    name: string;
    url: string;
  };
}
export interface IFormInput {
  id?: string | undefined;
  name: "title" | "description" | "url" | "price";
  label: string;
  type: string;
}
