# Dhyana Project Management Software

Project management software and collaboration tool. Helps organize and 
structure project planning to maximize success. Teams can create multiple
projects and manage them all in one single simple interface. 

**To launch the platform:**
1. run docker-compose build && docker-compose up in the terminal
2. navigate to localhost:8080 on your web browser of choice


**Features implemented:**


1. Sign up & Login

    - create a dhyana user by clicking sign up on the login page
    - fill in required information. (first and last name are optional)

2. User Feature

    - In the app bar, there is a search icon. This takes you to the search user page, which provides the ability to find any user on the platform, and view their Profile Page
    - The Profile Page shows what teams a user belongs to, and what projects they are working on. It additionally shows information about the user, and provides the ability to add that user to any team you currently belong to
    - My Profile and Edit Profile provide the ability to view and edit your own information, and delete your account, if you desire

3. Home Page

    - The Home page displays all teams and projects that a user belongs to
    - Each team and its associated projects are contained in a column, for ease of identifcation
    - Contains buttons to create team and create project
    - Ability to navigate into your teams' pages and your projects' pages
    
4. Project Page

    - This is the main feature of the app
    - Provides the ability to create, read, update, and delete columns (such as backlog, in progress, in review, done, etc)
    - Provides the ability to create, read, update, and delete tasks
        - Contain fields such as title, description, time estimated and completed, user assigned, priority and flag
        - Provides ability to leave comments on individual tasks
    - Ability to quickly swap between different projects
    - Ability to sort or filter tasks by priority, assigned user, date created and title
    - Ability to see who is in the team, quickly navigate to their profile pages, and add users to a team
    
    
5. Team Page

    - Ability to see who is in your team
    - Ability to see what projects belong to that team
    - Abiity to remove members
    - Ability to delete the team


**Preloaded Users (usernames are the same as passwords)**

    - testuser1 - has a large amount of teams and projects to view
    - ironman, thanos, srogers: can all view and edit the teams and projects made by testuser1
    
    - the avengers initiative is a good project to view the variety of states the TaskCard can be in