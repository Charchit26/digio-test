# DIGIO Test Submission

## Introduction
This app is developed to parse a network log file provided in a specific format and find:
- The number of unique IP addresses
- The top 3 most visited URLs
- The top 3 most active IP addresses

This is done by reading the file and then using a JS frequency Map to find the required details.

## How to Run The App
Steps:
1. Open terminal in the root folder and run `npm install`.
2. Update the log file in `logs/programming-task-example-data.log` with the logs which are supposed to be parsed.
3. Run `npm start` or `node .` to execute the program and parse the log file.

## How to run the tests
Steps:
1. Open terminal in the root folder and run `npm install`.
2. Run `npm test` to execute the all the tests via jest.

If you'd like to run the tests with coverage run `jest --coverage`

## Assumptions
I have taken the liberty to assume the following:
- If we are given a data input which has a clash for either of the top 3 categories for `most active IP` or 
`most visited URLs` then we return the entries as per their occurrence in the logs.
- If we have fewer than 3 unique entries for IP addresses or the visited pages then we return `undefined` at that place.

## Future Scope
- A utility file can be created to export `findTop3Items` and `updateFrequency` functions.
This will help re-use the logic if needed as well as they can be tested in isolation with more variety of test cases.