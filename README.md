# Welcome to my Discord Clone, *Harmony*

*Live Link:* https://discord-clone-teb.herokuapp.com/

## Discord at a glance

Discord is a full stack PERN app that enables users to send messages in real time within user-creatable channels inside of user-creatable servers. Logged in users are able to create their own servers, and text channels within those servers to create a space for them to message other users via the Socket.IO library.

## Application Architecture

Discord is built using a React frontend coupled with an Express backend, and a PostgreSQL database. The application also makes heavy use of the Socket.IO library to send messages.

## Frontend Overview

The bulk of Discord's functionality is borne by the backend, however there are three key technologies employed by the frontend for an optimal user experience.

#### React

Discord is a React application, thus all display related logic is handle by React and its associated libraries.

#### Redux

Redux is used to maintain global state within the frontend. Additionally, some of the API calls for this application are handled through Redux Thunks.


#### Socket.IO

Socket.IO is crucial for this programs functionality, primarily messaging, which this library enables users to do in real time.

## Backend Overview

Discord's backend is comprised of an Express server and a PostgreSQL database.

#### ExpressJS

ExpressJS is a simple nodejs framework that is favored throughout the industry, it's wide variety of libraries and vast support network made it a shoe in for this project.

#### PostgreSQL

PostgreSQL was the obvious choice for this project because it is simple to work with and synnergizes nicely with Sequelize.

#### Sequelize

Sequelize was chosen as the ORM for this project because of how well it integrates with PostgreSQL and ExpressJS.

#### Socket.IO

Socket.IO was also crucial on the backend so that the Express server could recieve the messages being sent within text channels and save the messages into the database for future reference.

## Conclusion and Next Steps

Currently I believe that this application is truly in its Minimal-Viable-Product stage, as a clone of Discord it has all the base functionality that would be expected of a clone, but it still leaves a desire for more. In the future as a continue to develop this project I intend to add Friendsips, Direct Messagign between Friends, Private Servers, and potentially Audio Video calling as well. In addition to functionality I would like to add to this applciation, I would also like to rework some of the CSS to better resemble the clean standards of the real Discord.
