import { gql } from "@apollo/client";

export const ADD_NOVEL = gql`
  mutation Mutation($image: String, $title: String) {
    addNovel(image: $image, title: $title) {
      id
      title
      image
      createdAt
      updatedAt
      authors {
        id
        name
        novelID
      }
    }
  }
`;

export const DELETE_NOVEL = gql`
  mutation Mutation($id: ID!) {
    deleteNovel(id: $id) {
      id
      title
      image
      createdAt
      updatedAt
      authors {
        id
        name
        novelID
      }
    }
  }
`;

export const ADD_AUTHOR = gql`
  mutation Mutation($novelId: ID!, $name: String) {
    addAuthor(novelId: $novelId, name: $name) {
      id
      name
      novelID
    }
  }
`;
export const DELETE_AUTHOR = gql`
  mutation Mutation($id: ID!) {
    deleteAuthor(novelId: $id) {
      id
      name
      novelID
    }
  }
`;

export const UPDATE_NOVEL = gql`
 mutation Mutation($id: ID!, $image: String, $title: String) {
  updateNovel(id: $id, image: $image, title: $title) {
    id
    title
    image
    createdAt
    updatedAt
    authors {
      id
      name
      novelID
    }
  }
}
`;

