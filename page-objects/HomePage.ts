import { Locator, Page } from "@playwright/test";
import ElementsPage from "./ElementsPage";

class HomePage {
  page: Page;
  elementsHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.elementsHeading = this.page.getByRole("heading", { name: "Elements" });
  }

  async go() {
    await this.page.goto("/");
  }

  async navigateToElements() {
    await this.elementsHeading.click();
    return new ElementsPage(this.page);
  }
}

export default HomePage;
