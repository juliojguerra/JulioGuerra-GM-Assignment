# JulioGuerra-GM-Assignment
UI and API tests for ToolsQA in https://demoqa.com/

## Tests
Application under test: https://demoqa.com/

UI Tests:

- TC01 - User can enter and edit data in webtables
- TC02 - Verify broken image
- TC03 - Verify user can submit the form
- TC04 - Verify the progress bar
- TC05 - Verify the tooltip
- TC06 - Verify user can drag and drop

API tests:
- Create a user
- Add a list of books (WIP)
- Remove one of the added books (WIP)

## Stack
- playwright: ^1.38.1
- typescript

## Installation
The project requires Node (recommended version 18.16.0)

1. Git clone this repository
2. In the main folder, run:

```
npm install
```

## Usage
1. Go to the main folder via console.
2. To run UI tests, execute `npm run test:ui`
3. To run API tests, execute `npm run test:api`

See more options to run tests in the package.json file

## Additional information 

📁 Tests are located in /e2e folder

📁 Page Objects are located in /page-objects folder

