# Create interactive UI with time series data.

The goal of this project is to consume information from two different APIs, and to present the contents of those APIs in a way that makes sense to users.

At the most basic level, you're being evaluated on a couple of different factors:

- Does the application that you write do what you were asked to do.
- Does your code function as expected.
- Does your code organization demonstrate a thoughtful approach to project structure.

## Requirements

1. Create a Javascript app
   You need to create a new Javascript app for this. We'd like to see you use a framework like React, Angular, or Vue, but ultimately that choice is up to you.

2. Configure your application to retrieve project information, and associated timeseries data.
   Two API endpoints are made available by this application. One of them gives you information about projects (solar developments). The other returns a series of data over time for one or more projects. You need to configure your application to be able to retrieve data from these two API endpoints.

Documentation for these two API endpoints is given below.

3. Display the data.
   When loaded, the application should:

- display the timeseries of data for each project.
- have each project's data be visually distinguishable from one another.
- have filters to show different data sets based on:
  - project
  - project size
  - datetime
- The rest of the visual/design elements are up to you.

4. Extra credit.
   The following are not necessary to accomplish the goal, but would be nice to see.

The ability to show the data in a user's local timezone vs. the project's timezone.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
