import { Locator, Page } from "@playwright/test";
import Droppable from "./DroppablePage";

class InteractionsPage {
  page: Page;
  droppableOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.droppableOption = this.page
      .locator("li")
      .filter({ hasText: "Droppable" });
  }

  async clickOnDroppable() {
    await this.droppableOption.click();
    return new Droppable(this.page);
  }
}

export default InteractionsPage;
