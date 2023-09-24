import { Locator, Page } from "@playwright/test";
import WebTablesPage from "./WebTablesPage";
import BrokenLinksImagesPage from "./BrokenLinksImagesPage";

class ElementsPage {
  page: Page;
  addButton: Locator;
  webTablesOption: Locator;
  brokenLinksImagesOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.webTablesOption = this.page.getByText("Web Tables");
    this.brokenLinksImagesOption = this.page.getByText("Broken Links - Images");
  }

  async go() {
    await this.page.goto("/webtables");
  }

  async clickOnWebTables() {
    await this.webTablesOption.click();
    return new WebTablesPage(this.page);
  }

  async clickOnBrokenLinksImages() {
    await this.brokenLinksImagesOption.click();
    return new BrokenLinksImagesPage(this.page);
  }
}

export default ElementsPage;
