# Fcard Backend

> This is a project for rebuilding the back-end of Dcard.

* Build back-end server from Node.js with Express.js framework
* Manipulate Database through Sequelize which is a Node.js ORM
* Gernerate session through Redis to mangage authentication of users
* Design Database schema
* Design API and test the interaction of request and response by Postman

[Prototype and Function](https://github.com/AnnieDoDo/Fcard/edit/master/README.md#Prototype-and-Function)

[Sitemap](https://github.com/AnnieDoDo/Fcard/edit/master/README.md#Sitemap)

[Database Schema](https://github.com/AnnieDoDo/Fcard/edit/master/README.md#Database-Schema)

[API](https://github.com/AnnieDoDo/Fcard/edit/master/README.md#API)


## Prototype and Function
1. Register & Login
* - [x] Register account and password
* - [x] Login account and password
* - [x] Logout
* - [ ] Fill personal information
* - [ ] Edit personal information
* - [ ] Modify account and password

2. Randomly pair users & Become friends to chat
* - [x] Randomly pair users
* - [ ] Send invitation to other users to be friends
* - [ ] Manage my friends
* - [ ] Chatting with others which were paired successfully
* - [ ] Delete my friend

3. Articles and searching them
* - [ ] Classification of articles
* - [ ] Write, Post, Edit, and Delete my articles
* - [ ] Write, Edit, and Delete my comments
* - [ ] Tag others in articles and comments
* - [ ] Press like to articles and comments
* - [ ] Report articles and comments
* - [ ] Searching articles

4. Noticication when somehting happened
* - [ ] Notify when my articles are pressed like
* - [ ] Notify when my comments are pressed like
* - [ ] Notify when I am tagged
* - [ ] Notify when I report articles or comments successfully
* - [ ] Notify when I and others become friends

## Sitemap
### Register and Login
* Register and Login Page
* Edit personal information page
  1. Introduciton
  2. My articles
  3. Modify accounts and passwords

### Randomly pair users and friends
* Randomly pair users page
* Manage friends and chatting room page

### Article
* Write article page
* Article and its comments page
* Classification of articles
  1. Hot classification of articles page
  2. Latest classification of articles page
  
## Database Schema
### Account Data
|Table AccountData  | Feature    | Type
|-----------------------|------------|-----
| Uid          | Primary key| VARCHAR(255) NOT NULL
| Email        |            | VARCHAR(255) NOT NULL VARCHAR(255) NOT NULL
| Password     |            | VARCHAR(255) NOT NULL
| OPEN         |            | BOOL NOT NULL
| Book         |            | BOOL NOT NULL
| Name                  |            | VARCHAR(255)
| Picture               |            | VARCHAR(255)
| School                |            | VARCHAR(255)
| Department            |            | VARCHAR(255)
| Birth                 |            | VARCHAR(255)
| Gender                |            | VARCHAR(255)
| Relationship          |            | VARCHAR(255)
| Skill                 |            | VARCHAR(255)
| Skill_Description     |            | VARCHAR(255)
| Interest              |            | VARCHAR(255)
| Interest_Description  |            | VARCHAR(255)
| Club                  |            | VARCHAR(255)
| Club_Description      |            | VARCHAR(255)
| Class                 |            | VARCHAR(255)
| Class_Description     |            | VARCHAR(255)
| Country               |            | VARCHAR(255)
| Country_Description   |            | VARCHAR(255)
| Obsession             |            | VARCHAR(255)
| Obsession_Description |            | VARCHAR(255)
| Talent                |            | VARCHAR(255)
| Talent_Description    |            | VARCHAR(255)
| Wannatry              |            | VARCHAR(255)
| Wannatry_Description  |            | VARCHAR(255)

### Padding
| Table Padding    | Feature            | Type
|------------------|--------------------|-------
| PD_id            | Primary key        | VARCHAR(255) NOT NULL
| F1_id            | Foreign key of U_id| VARCHAR(255) NOT NULL
| F2_id            | Foreign key of U_id| VARCHAR(255) NOT NULL

### Friend
| Table Friend          | Feature    | Type
|-----------------------|------------|-----
| F_id                  | Primary key| VARCHAR(255) NOT NULL
| F1_id                 | Foreign key of U_id| VARCHAR(255) NOT NULL
| F2_id                 | Foreign key of U_id| VARCHAR(255) NOT NULL

### Friend Message
| Table Friend_Message | Feature             | Type
|----------------------|---------------------|-----
| FM_id                | Primary key         | VARCHAR(255) NOT NULL
| FR_id                | Foreign key of Friend| VARCHAR(255) NOT NULL
| Sender               | Foreign key of F1_id or F2_id| VARCHAR(255) NOT NULL
| Receiver             | Foreign key of F1_id or F2_id| VARCHAR(255) NOT NULL
| Text                 |                              | VARCHAR(255) NOT NULL

### Article
| Table Article   | Feature                | Type
|-----------------|------------------------|-------------
| A_id            | Primary key            | VARCHAR(255) NOT NULL
| A_Author_id     | Foreign key of Account | VARCHAR(255) NOT NULL
| A_Type          |                        | VARCHAR(255) NOT NULL
| A_Title         |                        | VARCHAR(255) NOT NULL
| A_Text          |                        | VARCHAR(255) NOT NULL
| A_Heart         |                        | INTEGER NOT NULL
| A_CommentCount  |                        | INTEGER NOT NULL

A_Type:
| Food
| Mood
| Funny
| Girl
| Boy
| Rainbow
| Entertainer
| Handcraft
| Pet
| Movie
| TVepisode
| Music
| ACG
| Sport
| Trending
| Job
| Studyaboard
| Exam
| Language

### Comment
| Table Comment    | Feature               | Type
|------------------|-----------------------|------
| C_id             | Primary key           | VARCHAR(255) NOT NULL
| C_A_id           | Foreign key of Article| VARCHAR(255) NOT NULL
| C_Author_id      | Foreign key of Account| VARCHAR(255) NOT NULL
| C_B_number       | Ascending             | INTEGER NOT NULL
| C_Text           |                       | VARCHAR(255) NOT NULL
| C_Heart          |                       | INTEGER NOT NULL

### Notification
| Table Notification    | Feature    | Type
|-----------------------|------------|------
| N_id                  | Primary key| VARCHAR(255) NOT NULL
| N_Acc_id              | Foreign key of Account| VARCHAR(255) NOT NULL
| N_A_id                | Foreign key of Article| VARCHAR(255) NOT NULL
| N_F_id                | Foreign key of Friend| VARCHAR(255) NOT NULL
| N_Type                |            | VARCHAR(255) NOT NULL

## API
### Register + Login
| Endpoint        | Method | Request         | Response  | Progress
|-----------------|--------|-----------------|-----------|---------
| /registerSubmit | POST   | Email, passowrd | "regSubOK"|  OK
| /registerRemail     | POST   | Email           | "regRemail"| 
| /loginSubmit    | POST   | Email, password | "logSubOK"|  OK
| /logout         | GET    |                 | "logoutOK"| OK
| /myinfo/modifySub| POST  |

### Randomly pair and Friends
| Endpoint        | Method | Request         | Response | Progress
|-----------------|--------|-----------------|----------|----------
| /drawSubmit     | GET    |               | "drawSubOK"| OK
| /inviteSubmit   | GET    |               | "invSubOK" | 
| /getDrewData   | GET    |               | JSON { Gender: '', School: '', Department: '', SkillDescription: '', ClubDescription: '', ClassDescription: '', CountryDescription: '', TalentDescription: '', WannatryDescription: ''} | OK
| /message/send/{FR_id}| POST| TEXT          | "mesSendOK"
| /friend/delete  | DELETE |                 | "friDelOK"
  
