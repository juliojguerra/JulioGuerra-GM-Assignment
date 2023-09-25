import { Locator, Page } from "@playwright/test";

class ToolTipsPage {
  page: Page;
  hoverMeButton: Locator;
  tooltip: Locator;

  constructor(page: Page) {
    this.page = page;
    this.hoverMeButton = this.page.getByRole("button", {
      name: "Hover me to see",
    });
    //this.tooltip = this.page.getByText("You hovered over the Button");
    this.tooltip = this.page.locator("//div[@class='tooltip-inner']");
  }

  async hoverButton() {
    // Pending to find a better approach than adding a wait time
    const WAIT_TIME_OUT = 2000; //ms
    await this.page.waitForTimeout(WAIT_TIME_OUT);

    await this.hoverMeButton.hover();
  }

  async getToolTipText() {
    await this.waitForToolTipToAppear();
    return await this.tooltip.textContent();
  }

  async waitForToolTipToAppear() {
    await this.tooltip.waitFor();
  }
}

export default ToolTipsPage;
