import { Locator, Page } from "@playwright/test";

class WebTablesPage {
  page: Page;
  addButton: Locator;
  registrationFormTitle: Locator;
  modal: Locator;
  firstNameInput: Locator;
  lastNameInput: Locator;
  emailInput: Locator;
  ageInput: Locator;
  salaryInput: Locator;
  departmentInput: Locator;
  submitButton: Locator;
  tableRows: Locator;
  emptyRow: Promise<number>;

  constructor(page: Page) {
    this.page = page;
    this.addButton = this.page.getByRole("button", { name: "Add" });
    this.registrationFormTitle = this.page.getByText("Registration Form");
    this.modal = this.page.locator(".modal-content");
    this.firstNameInput = this.page.getByPlaceholder("First Name");
    this.lastNameInput = this.page.getByPlaceholder("Last Name");
    this.emailInput = this.page.getByPlaceholder("name@example.com");
    this.ageInput = this.page.getByPlaceholder("Age");
    this.salaryInput = this.page.getByPlaceholder("Salary");
    this.departmentInput = this.page.getByPlaceholder("Department");
    this.submitButton = this.page.getByRole("button", { name: "Submit" });
    this.tableRows = this.page.locator(
      "//div[@class='rt-tbody']//div[@role='row']"
    );
    this.emptyRow = this.getEmptyRow();
  }

  async clickOnAddbutton() {
    await this.addButton.click();
  }

  async getModal() {
    return this.modal;
  }

  getRegistrationFormTitle() {
    return this.registrationFormTitle;
  }

  async fillRegistrationForm({
    firstName,
    lastName,
    age,
    email,
    salary,
    department,
  }) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.ageInput.fill(age);
    await this.emailInput.fill(email);
    await this.salaryInput.fill(salary);
    await this.departmentInput.fill(department);
  }

  async submitRegistrationForm() {
    await this.submitButton.click();
  }

  async editNames(firstName: string, lastName: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
  }

  async clickEditOn(textContent: string) {
    await this.getEditRow(textContent)
      .getByTitle("Edit")
      .getByRole("img")
      .click();
  }

  getEditRow(textContent: string) {
    // Get the first element with the corresponding textContent
    return this.page.getByRole("row", { name: textContent }).nth(0);
  }

  async getNewRowText() {
    // Return the new row's text just added
    let newRow = this.tableRows.nth(await this.emptyRow);
    return newRow.textContent();
  }

  async getEmptyRow() {
    // Get row in blank where the system will add the new information
    const rows = this.tableRows;
    const count = await rows.count();

    // Iterate through rows
    for (let i = 0; i < count; i++) {
      let row = rows.nth(i);
      let rowText = await row.textContent();

      if (rowText !== null) {
        // If row has blanks, return the index as emptyRow
        const isBlank = /^\s*$/.test(rowText);

        if (isBlank) {
          let emptyRow = i;

          return emptyRow;
        }
      }
    }

    // If no empty row, use pagination (WIP)
    return -1;
  }
}

export default WebTablesPage;
