import { Locator, Page } from "@playwright/test";
import ElementsPage from "./ElementsPage";
import FormsPage from "./FormsPage";

class HomePage {
  page: Page;
  elementsHeading: Locator;
  formsHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.elementsHeading = this.page.getByRole("heading", { name: "Elements" });
    this.formsHeading = this.page.getByRole("heading", { name: "Forms" });
  }

  async go() {
    await this.page.goto("/");
  }

  async navigateToElements() {
    await this.elementsHeading.click();
    return new ElementsPage(this.page);
  }

  async navigateToForms() {
    await this.formsHeading.click();
    return new FormsPage(this.page);
  }
}

export default HomePage;
