import { Locator, Page, expect } from "@playwright/test";

class ProgressBarPage {
  page: Page;
  progressBarHeader: Locator;
  progressBarElement: Locator;
  startButton: Locator;
  fullProgressBar: Locator;
  resetButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.progressBarHeader = this.page
      .locator("#progressBarContainer")
      .getByText("Progress Bar");
    this.progressBarElement = this.page.getByRole("progressbar");
    this.startButton = this.page.getByRole("button", { name: "Start" });
    this.fullProgressBar = this.page.locator(
      "//div[@role='progressbar' and @aria-valuenow='100']"
    );
    this.resetButton = this.page.getByRole("button", { name: "Reset" });
  }

  async getProgressBarWidth() {
    return await this.progressBarElement.getAttribute("style");
  }

  async clickOnStartButton() {
    await this.startButton.click();
  }

  async clickOnResetButton() {
    await this.resetButton.click();
  }

  async waitForProgressBarToFill() {
    await this.fullProgressBar.waitFor();
  }
}

export default ProgressBarPage;
