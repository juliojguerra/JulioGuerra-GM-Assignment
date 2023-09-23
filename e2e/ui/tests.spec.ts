import { test, expect } from "@playwright/test";
import HomePage from "../../page-objects/HomePage";

import { addData, editData } from "../../test-data/registrationForm.json";

let homePage: HomePage;

test.beforeEach(async function ({ page }) {
  homePage = new HomePage(page);
  await homePage.go();
});

test("User can enter and edit data in webtables", async function ({}) {
  // TC01 - Scenario A: Verify user can enter new data into the table
  const elementsPage = await homePage.navigateToElements();
  const webTablesPage = await elementsPage.clickOnWebTables();

  webTablesPage.clickOnAddbutton();

  const registrationFormModal = await webTablesPage.getModal();

  await expect(
    registrationFormModal,
    "Registration Form modal was not displayed"
  ).toBeVisible();

  await webTablesPage.fillRegistrationForm(addData);
  await webTablesPage.submitRegistrationForm();

  const newRowRecord = await webTablesPage.getNewRowText();

  expect(newRowRecord).toContain(addData.firstName);
  expect(newRowRecord).toContain(addData.lastName);
  expect(newRowRecord).toContain(addData.email);
  expect(newRowRecord).toContain(addData.age);
  expect(newRowRecord).toContain(addData.salary);
  expect(newRowRecord).toContain(addData.department);

  // TC01 - Scenario B - Verify user can edit the row in a table

  await webTablesPage.clickEditOn(editData.oldFirstName);
  await webTablesPage.editNames(editData.newFirstName, editData.newLastName);
  await webTablesPage.submitRegistrationForm();

  const editRowRecord = await webTablesPage
    .getEditRow(editData.newFirstName)
    .textContent();

  expect(editRowRecord).toContain(editData.newFirstName);
  expect(editRowRecord).toContain(editData.newLastName);
});
