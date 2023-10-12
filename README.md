# Configurable List Form Field

Jotform has
the [configurable list widget](https://www.jotform.com/help/282-how-to-set-up-the-configurable-list-widget/):

> “With the Configurable List widget, you can define and display a set of fields or questions on your form. Your
> respondents can then add and answer as many of those fieldsets on your form as you allow. This is ideal for asking a
> set
> of questions multiple times.”

A single use would look like:

| config_list |
|-------------|
| Single_Use  |

Multiple uses would look like:

| config_list                                           |
|-------------------------------------------------------|
| First_Use<br/>Second_Use<br/>Third_Use<br/>Fourth_Use |

The data from the configurable list is added to a single cell within a row of a table. When the configurable list is
used multiple times, each use adds additional data to the same cell within the row of the table.

This was not optimal for my use case.

# Motivation for this project

The above approach was not optimal for my use case. The configurable list would function as the input field for adding
details about project leaders with each row representing a project. The configurable list would have the following
inputs:

* First Name
* Last Name
* Title
* Affiliation
* Email

What I needed was to have each input in the configurable list be its own cell in
the particular row within the table. When the configurable list is used multiple times, each use would add additional
columns to the table if needed.

A single use would look like:

| First Name | Last Name | Title     | Affiliation | Email           |
|------------|-----------|-----------|-------------|-----------------|
| John       | Doe       | Assistant | MIT         | johndoe@mit.edu |

Multiple uses would look like:

| First Name | Last Name | Title     | Affiliation | Email           | First Name 2 | Last Name 2 | Title 2   | Affiliation 2 | Email 2         |
|------------|-----------|-----------|-------------|-----------------|--------------|-------------|-----------|---------------|-----------------|
| John       | Doe       | Assistant | MIT         | johndoe@mit.edu | Jane         | Doe         | Assistant | MIT           | janedoe@mit.edu |

This project is simply a proof of concept for how to accomplish this using HTML, CSS, and JavaScript.