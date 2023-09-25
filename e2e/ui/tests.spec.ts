import { test, expect } from "@playwright/test";
import HomePage from "../../page-objects/HomePage";
import { addData, editData } from "../../test-data/registrationForm.json";
import practiceFormData from "../../test-data/practiceForm.json";

let homePage: HomePage;

test.beforeEach(async function ({ browser }) {
  const context = await browser.newContext();

  // Disable googleAds
  await context.route("**/*", async (route) => {
    if (
      route.request().url().startsWith("https://googleads.") ||
      route.request().url().startsWith("https://tpc.googlesyndication")
    ) {
      await route.abort();
    } else {
      await route.continue();
    }
  });

  const page = await context.newPage();

  homePage = new HomePage(page);
  await homePage.go();
});

test("TC01 - User can enter and edit data in webtables", async function ({}) {
  // TC01 - Scenario A: Verify user can enter new data into the table
  const elementsPage = await homePage.navigateToElements();
  const webTablesPage = await elementsPage.clickOnWebTables();

  webTablesPage.clickOnAddbutton();

  const registrationFormModal = await webTablesPage.getModal();

  await expect
    .soft(registrationFormModal, "Registration Form modal was not displayed")
    .toBeVisible();

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

test("TC02 - Verify broken image", async function () {
  const elementsPage = await homePage.navigateToElements();
  const brokenLinksImages = await elementsPage.clickOnBrokenLinksImages();
  const brokenImage = brokenLinksImages.getFirstBrokenImage();

  const isVisible = await brokenImage.isVisible();

  expect(isVisible, "Broken image is visible now").toBe(false);
});

test("TC03 - Verify user can submit the form", async function () {
  const formsPage = await homePage.navigateToForms();
  await formsPage.clickOnPracticeForm();
  await formsPage.fillPracticeForm(practiceFormData);
  await formsPage.submitForm();

  const modalHeaderText = await formsPage.getModalHeaderText();

  expect.soft(modalHeaderText).toContain("Thanks for submitting the form");

  const studentInfoModal = await formsPage.getInformationFromModal();

  expect(studentInfoModal.studentFullName).toEqual(
    `${practiceFormData.firstName} ${practiceFormData.lastName}`
  );
  expect(studentInfoModal.studentEmail).toEqual(practiceFormData.email);
  expect(studentInfoModal.gender).toEqual(practiceFormData.gender);
  expect(studentInfoModal.mobile).toEqual(practiceFormData.mobile);

  // Pending to compare string dates "15 Jan 1990" vs "15 January,1990"
  // expect(studentInfoModal.dateOfBirth).toContain(practiceFormData.dateOfBirth);

  expect(studentInfoModal.subjects).toEqual(practiceFormData.subjects);
  expect(studentInfoModal.hobbies).toEqual(practiceFormData.hobbies);
  expect(studentInfoModal.currentAddress).toEqual(
    practiceFormData.currentAddress
  );
  expect(studentInfoModal.stateCity).toEqual(
    `${practiceFormData.state} ${practiceFormData.city}`
  );
});
