import { Locator, Page, expect } from "@playwright/test";
import path from "path";

class FormsPage {
  page: Page;
  practiceForm: Locator;
  firstNameInput: Locator;
  lastNameInput: Locator;
  emailInput: Locator;
  genderRadioButtons: Locator;
  mobileInput: Locator;
  dateOfBirthInput: Locator;
  subjectsInput: Locator;
  hobbiesCheckboxes: Locator;
  uploadPictureSelector: string;
  currentAddressInput: Locator;
  stateInput: Locator;
  stateDropdown: Locator;
  cityInput: Locator;
  cityDropdown: Locator;
  submitButton: Locator;
  modalHeader: Locator;
  studentFullNameInModal: Locator;
  studentEmailInModal: Locator;
  genderInModal: Locator;
  mobileInModal: Locator;
  dateOfBirthInModal: Locator;
  subjectsInModal: Locator;
  subjectsDropdown: Locator;
  hobbiesInModal: Locator;
  currentAddressInModal: Locator;
  stateCityInModal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.practiceForm = this.page.getByText("Practice Form");
    this.firstNameInput = this.page.getByPlaceholder("First Name");
    this.lastNameInput = this.page.getByPlaceholder("Last Name");
    this.emailInput = this.page.getByPlaceholder("name@example.com");
    this.genderRadioButtons = this.page.getByText("MaleFemaleOther");
    this.mobileInput = this.page.getByPlaceholder("Mobile Number");
    this.dateOfBirthInput = this.page.locator("#dateOfBirthInput");
    this.subjectsInput = this.page.locator("#subjectsInput");
    this.subjectsDropdown = this.page.locator("#react-select-2-option-0");
    this.hobbiesCheckboxes = this.page.getByText("SportsReadingMusic");
    this.currentAddressInput = this.page.getByPlaceholder("Current Address");
    this.stateInput = this.page.locator(
      "//div[contains(text(),'Select State')]"
    );
    this.stateDropdown = this.page.getByText(
      "NCRUttar PradeshHaryanaRajasthan"
    );
    this.cityInput = this.page.locator("//div[contains(text(),'Select City')]");
    this.cityDropdown = this.page.getByText("DelhiGurgaonNoida");

    this.uploadPictureSelector = "input[id='uploadPicture']";

    this.submitButton = this.page.getByRole("button", { name: "Submit" });

    // Modal elements
    this.modalHeader = this.page.getByText("Thanks for submitting the form");

    this.studentFullNameInModal = this.page.locator(
      "//td[normalize-space()='Student Name']/following-sibling::td"
    );
    this.studentEmailInModal = this.page.locator(
      "//td[normalize-space()='Student Email']/following-sibling::td"
    );

    this.genderInModal = this.page.locator(
      "//td[normalize-space()='Gender']/following-sibling::td"
    );

    this.mobileInModal = this.page.locator(
      "//td[normalize-space()='Mobile']/following-sibling::td"
    );

    this.dateOfBirthInModal = this.page.locator(
      "//td[normalize-space()='Date of Birth']/following-sibling::td"
    );

    this.subjectsInModal = this.page.locator(
      "//td[normalize-space()='Subjects']/following-sibling::td"
    );

    this.hobbiesInModal = this.page.locator(
      "//td[normalize-space()='Hobbies']/following-sibling::td"
    );

    this.currentAddressInModal = this.page.locator(
      "//td[normalize-space()='Address']/following-sibling::td"
    );

    this.stateCityInModal = this.page.locator(
      "//td[normalize-space()='State and City']/following-sibling::td"
    );
  }

  async getModalHeaderText() {
    return await this.modalHeader.textContent();
  }

  async clickOnPracticeForm() {
    await this.practiceForm.click();
    return new FormsPage(this.page);
  }

  async fillPracticeForm({
    firstName,
    lastName,
    email,
    gender,
    mobile,
    dateOfBirth,
    subjects,
    hobbies,
    fileName,
    currentAddress,
    state,
    city,
  }) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);

    await this.genderRadioButtons.getByText(gender, { exact: true }).click();
    await this.mobileInput.fill(mobile);

    await this.dateOfBirthInput.fill(dateOfBirth);
    await this.page.getByText("Date of Birth").first().click();

    await this.subjectsInput.fill(subjects);
    await this.subjectsDropdown.click();

    await this.hobbiesCheckboxes.getByText(hobbies).click({ force: true });

    await this.uploadPicture(fileName);

    await this.currentAddressInput.fill(currentAddress);

    await this.stateInput.click({ force: true });

    const stateOption = this.page.getByText(state, { exact: true });

    await stateOption.click({ force: true });

    await this.cityInput.click({ force: true });

    const cityOption = this.page.getByText(city, { exact: true });

    await cityOption.click({ force: true });
  }

  async uploadPicture(fileName: string) {
    // Construct the relative file path using __dirname
    const relativeFilePath = path.join(__dirname, "../test-files", fileName);

    await this.page.setInputFiles(this.uploadPictureSelector, relativeFilePath);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async getInformationFromModal() {
    let studentInfo = {
      studentFullName: await this.studentFullNameInModal.textContent(),
      studentEmail: await this.studentEmailInModal.textContent(),
      gender: await this.genderInModal.textContent(),
      mobile: await this.mobileInModal.textContent(),
      dateOfBirth: await this.dateOfBirthInModal.textContent(),
      subjects: await this.subjectsInModal.textContent(),
      hobbies: await this.hobbiesInModal.textContent(),
      currentAddress: await this.currentAddressInModal.textContent(),
      stateCity: await this.stateCityInModal.textContent(),
    };

    return studentInfo;
  }
}

export default FormsPage;
