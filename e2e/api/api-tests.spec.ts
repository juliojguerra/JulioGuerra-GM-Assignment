import { test, expect, request } from "@playwright/test";
import { base, faker } from "@faker-js/faker";

test.describe.configure({ mode: "serial" });

const username = faker.internet.userName();

const newUserData = {
  userName: username,
  password: "Letmein23!",
};

let userID;
let token;

async function getBooksIsbn(baseURL: string) {
  //https://demoqa.com/BookStore/v1/Books
  const apiContext = await request.newContext();
  const response = await apiContext.get(`${baseURL}/BookStore/v1/Books`);

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const responseJson = await response.json();

  const books = responseJson.books;

  // Extract the 'isbn' values
  const isbns = books.map((book) => book.isbn);

  // Now 'isbns' is an array containing all the 'isbn' values
  return isbns;
}

async function generateToken(baseURL: string) {
  const apiContext = await request.newContext();
  const response = await apiContext.post(
    `${baseURL}/Account/v1/GenerateToken`,
    {
      data: newUserData,
    }
  );

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const responseJson = await response.json();

  return responseJson.token;
}

// Create user
test("Create a new user", async ({ baseURL }) => {
  const apiContext = await request.newContext();
  const response = await apiContext.post(`${baseURL}/Account/v1/User`, {
    data: newUserData,
  });

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(201);

  const responseJson = await response.json();

  userID = responseJson.userID;
  token = await generateToken(baseURL);

  expect(responseJson).toHaveProperty("userID");
  expect(responseJson).toHaveProperty("username");
  expect(responseJson.username).toEqual(newUserData.userName);
});

test("Verify is not possible to create user with the same userName", async ({
  baseURL,
}) => {
  const apiContext = await request.newContext();
  const response = await apiContext.post(`${baseURL}/Account/v1/User`, {
    data: {
      userName: "jguerra2",
      password: "Letmein23!",
    },
  });

  expect(response.ok()).toBeFalsy();
  expect(response.status()).toBe(406);

  const responseJson = await response.json();

  expect(responseJson).toHaveProperty("code");
  expect(responseJson).toHaveProperty("message");
  expect(responseJson.message).toEqual("User exists!");
});

// Add a list of books
test("Add a list of books", async ({ baseURL }) => {
  const booksIsbn = await getBooksIsbn(baseURL);

  const apiContext = await request.newContext();
  const response = await apiContext.post(`${baseURL}/BookStore/v1/Books`, {
    data: {
      userId: userID,
      collectionOfIsbns: [
        {
          isbn: booksIsbn[0], //Will add the first isbn
        },
      ],
    },
  });

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(201);

  const responseJson = await response.json();
});
