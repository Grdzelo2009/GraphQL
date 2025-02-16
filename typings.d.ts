import { Author , Novel } from "@/graphql/";

interface INovel extends Novel{
    [x: string]: Key | null | undefined;
    authors:Author[]
}

// export interface Author {
//     id?: string; 
//     name: string;
//     novelID: string;
//   }
  
//   export interface Novel {
//     id: string;
//     title: string;
//     image: string;
//     authors: Author[];
//     createdAt: string;
//     updatedAt: string;
//   }
  