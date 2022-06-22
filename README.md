<h1 align="center">
  Devblog
</h1>

<h3 align="center">
  An simple aplication using nestjs, vite and yarn workspaces
</h3>

## Technologies

  ----------
  #### Package
    - Yarn workspaces

  #### Font-end:
    
    - React
    - Vite
    - Stiches-React

  #### back-end:
    
    - Nestjs
    - MongoDB

## Use cases

  Non-functional requirements:

    front-end: 
      [] React
      [] Vite
      [] Stiches-React

    back-end: 
      [x] Nestjs
      [x] MongoDB

  Functional requirements:

    When user is unauthenticate:
      [x] - user can authenticate.
      [x] - user can be abble to create.
      [x] - user can be abble to read the posts.
      [x] - user can be recovery password by email link.
      [] - user can use github credentials to create account.
      [x] - when user create an account, the email must be verified by a link sended to user's email.

    When user is authenticated:
      [x] - user can be abble to update profile if email has been verified.
      [x] - user can have multiple posts.
      [] - user can be abble to like an post.
      [] - user can be abble to unlike a post.
      [x] - user can be abble to create, read, update and delete posts (CRUD).

    Posts:
      [x] - the post must contain an author
      [x] - the post can have a multiple tags