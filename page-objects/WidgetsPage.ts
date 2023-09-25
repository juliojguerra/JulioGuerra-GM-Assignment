import { Locator, Page } from "@playwright/test";
import ProgressBarPage from "./ProgressBarPage";
import ToolTipsPage from "./ToolTipsPage";

class WidgetsPage {
  page: Page;
  progressBarOption: Locator;
  toolTipsOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.progressBarOption = this.page
      .locator("li")
      .filter({ hasText: "Progress Bar" });
    this.toolTipsOption = this.page
      .locator("li")
      .filter({ hasText: "Tool Tips" });
  }

  async clickOnProgressBar() {
    await this.progressBarOption.click();
    return new ProgressBarPage(this.page);
  }

  async clickOnToolTips() {
    await this.toolTipsOption.click();
    return new ToolTipsPage(this.page);
  }
}

export default WidgetsPage;
