# Dhyana Project Management Software

Project management software and collaboration tool. Helps organize and
structure project planning to maximize success. Teams can create multiple
projects and manage them all in one single simple interface.

## Compiling Instructions:

1. From the root folder simply run `docker-compose build && docker-compose up`
2. Access the app from [localhost:8080](http://localhost:8080/)
3. The database and the api also require ports `5432` and `3000` to be available

## Features implemented:

1. Users

- You can create a new user using the sign up button on the login page.
- You must enter a password and a unique username, but can include a first and last
- name, a job title, and a biography
- Once created you can use the username and password to login.
- Or you can use one of our premade users, each of which has at least one team and project
  - username: testuser1, password: testuser1
  - username: ironman, password: ironman
  - username: thanos, password: thanos
  - username: srogers, password: srogers
- You can view your profile by clicking on the icon in the app bar menu
- You can then edit your names, job title, biography, and password by
  clicking "Edit Profile".
- You can logout by clicking on the button in the app bar.

2. Home page

- All of your current teams are listed here.
- Any projects that belong to your teams are listed underneath them
- From here you can create a team or project. If you have no teams you
  must create at least one before you can create a project.
- Both team and project cards are clickable to take you to management pages.

3. Teams

- Teams can be created from the home page or from menu in the app bar.
- You can view a team's current memebers and projects through the team management page.
- You can add members to a team from the project page or from the team management page.
- Teams can be deleted from the team management page. This will delete all of the team's projects.

4. Projects

- Projects can be created from the home page. After creation you should be redirected to
  the project management page.
- Projects belong to a team and only memebers of that team should be able to see and edit it.
- Projects can be viewed, edited, from the project management page.
- Deleting a project will delete all of its columns and tasks.
- You currently cannot assign a project to a new team.

5. Columns

- Projects are made up of multiple columns.
- Columns can be viewed and created from the project management page.
- Columns have a menu where you can filter or sort tasks.
- The menu also provides delete functionality. Deleting a columns
  deletes all its tasks
- You currently cannot reorder the columns.

6. Tasks

- Tasks belong to columns.
- In the project management page you can create, view, and edit tasks.
- Tasks need a title
- Tasks can have a description, a priority, and an estimated time.
- Tasks can also be assigned to a user in the team.
- Tasks can be moved between columns with drang and drop.
- Once created, the task card can be clicked to edit or delete a task
