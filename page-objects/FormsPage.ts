import { Locator, Page } from "@playwright/test";

class FormsPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}

export default FormsPage;
