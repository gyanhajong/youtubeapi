

# Instructions

## Starting the application
### Prerequisite
Should have docker installed in your local system.

### Steps to start the backend application
* Download the project in your local machine.
* Run "docker-compose up" after going inside the downloaded project.

## API Guide

Base Endpoint for videos: http://localhost:3000/api/videos

**Response**

A paginated response of the below structure:
```
    {
        "totalPages": 1,
        "currentPage": 0,
        "pageInfo": {
            "totalResults": 0,
            "resultsPerPage": 3
        },
        "items": []
    }
```

**totalPages** - Gives the total number of pages available for the search or default hitting of the endpoint.
**currentPage** - The page number of the current response.
**pageInfo** - "totalResults" is the total number of results/items. "resultsPerPage" is the number of results/items per page.
**items** - It is the result/items for a search, in the array.

**Request Params**
page - The page number/token (default is 0) of the response.
size - The size indicates the number of items/result limit for a page to contain.
title - Search video details by querying with video title.
desc - Search video details by querying with video description.

Example:
This query will give us response of the 2nd page(0 indexed), 5 items/page for the search query "Programming":
http://localhost:3000/api/videos?page=1&size=5&title=Programming

## Predefined Search Query
There are predefined attributes or search query set for fetching data from the youtube api:
Search Query: "errichto"
order by: date
Type of response: video
Only Videos published after: 2021-01-01T00:00:00Z

You may make the changes in the attributes value from the file api/datafetch.js(line 14 defines the params/attributes)

## Note 
The data fetching is currently done once due to quota limit. You may uncomment the line 29 in server.js file for setting it to fetch after every regular interval.