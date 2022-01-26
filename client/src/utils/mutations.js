import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation login ($email: String!, $password: String!) {
    login ($email: String!, $password: String!) {
        token
        user {
            _id
            username
        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser ($username: String!, $email: String, $password: String) {
    addUser ($username: String!, $email: String, $password: String) {
        token
        user {
            _id
            username
        }
    }
}`;

export const SAVE_BOOK = gql`
mutation saveBook($newBook: InputBook!) {
    saveBook ($newBook: InputBook!) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
}
`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: ID!) {
    saveBook($bookId: ID!) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
}
`;
