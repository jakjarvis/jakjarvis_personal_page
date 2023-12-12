# jakjarvis_personal_page

This is the source code for my Resume website at jakjarvis.com.

The website is written as a static HTML/CSS/JS website.

## Notes on using Firebase to deploy

Note: page automatically deploys to firebase upon pushing master to github via GH action, so manual deploy only needed when not simultaneously pushing to github.

- open bash terminal and navigate to the project directory
- use command
  firebase deploy --only hosting
