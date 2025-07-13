# Web Development Project - HobbyHub

Submitted by: **Jafrul Amin**

This web app: **HobbyHub is a dynamic forum web application where users can create, share, and interact with posts about their hobbies. Users can create posts with titles, content, and images, engage with others through comments, and show appreciation through upvotes.**

Time spent: **12** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Web app includes a create form that allows the user to create posts**
  - [x] Form requires users to add a post title
  - [x] Forms have the option for users to add:
    - [x] Additional textual content
    - [x] An image added as an external image URL
- [x] **Web app includes a home feed displaying previously created posts**
  - [x] Web app includes home feed displaying previously created posts
  - [x] By default, each post on the posts feed shows:
    - [x] Creation time
    - [x] Title
    - [x] Upvotes count
  - [x] Clicking on a post directs the user to a new page for the selected post
- [x] **Users can view posts in different ways**
  - [x] Users can sort posts by either:
    - [x] Creation time
    - [x] Upvotes count
  - [x] Users can search for posts by title
- [x] **Users can interact with each post in different ways**
  - [x] The app includes a separate post page for each created post when clicked, showing:
    - [x] Content
    - [x] Image
    - [x] Comments
  - [x] Users can leave comments underneath a post on the post page
  - [x] Each post includes an upvote button on the post page
    - [x] Each click increases the post's upvotes count by one
    - [x] Users can upvote any post any number of times
- [x] **A post that a user previously created can be edited or deleted from its post pages**
  - [x] After a user creates a new post, they can go back and edit the post
  - [x] A previously created post can be deleted from its post page

The following **additional** features are implemented:

- [x] Modern Material-UI design with responsive layout
- [x] Snackbar notifications for user feedback on actions
- [x] Hover effects on posts for better user interaction
- [x] Dialog-based edit form for seamless post editing
- [x] Real-time updates after post modifications

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='VideoWalkthrough.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with ScreenToGif

## Notes

Describe any challenges encountered while building the app:

- Implementing the search functionality with proper state management
- Setting up Supabase for the backend and managing database relationships
- Handling real-time updates for comments and upvotes
- Managing post ownership and edit/delete permissions
- Ensuring consistent styling across different components

## License

    Copyright [2024] [Jafrul Amin]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
