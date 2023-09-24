import { Locator, Page } from "@playwright/test";
import WebTablesPage from "./WebTablesPage";

class ElementsPage {
  page: Page;
  addButton: Locator;
  webTablesOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.webTablesOption = this.page.getByText("Web Tables");
  }

  async go() {
    await this.page.goto("/webtables");
  }

  async clickOnWebTables() {
    await this.webTablesOption.click();
    return new WebTablesPage(this.page);
  }
}

export default ElementsPage;
