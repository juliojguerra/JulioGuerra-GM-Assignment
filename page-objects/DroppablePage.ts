import { Locator, Page, expect } from "@playwright/test";

class Droppable {
  page: Page;
  header: Locator;
  dragMeBox: Locator;
  dropHereBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = this.page
      .locator("div")
      .filter({ hasText: /^Droppable$/ })
      .first();
    this.dragMeBox = this.page.locator("(//div[@id='draggable'])[1]");
    this.dropHereBox = this.page.locator("(//div[@id='droppable'])[1]");
  }

  async dragAndDrop() {
    await this.dragMeBox.dragTo(this.dropHereBox);
  }

  async dragAndDropToCenter() {
    // Pending to find a better approach than adding a wait time
    const WAIT_TIME_OUT = 2000; //ms
    await this.page.waitForTimeout(WAIT_TIME_OUT);

    // Calculate the center of the target element
    const sourceBox = await this.dragMeBox.boundingBox();
    const targetBox = await this.dropHereBox.boundingBox();

    if (!targetBox || !sourceBox) {
      return -1;
    }

    const targetCenterX = targetBox.x + targetBox.width / 2;
    const targetCenterY = targetBox.y + targetBox.height / 2;

    // Move the mouse to the center of the source element
    await this.page.mouse.move(
      sourceBox.x + sourceBox.width / 2,
      sourceBox.y + sourceBox.height / 2
    );

    // Press down the mouse button
    await this.page.mouse.down();

    // Move the mouse to the center of the target element
    await this.page.mouse.move(targetCenterX, targetCenterY);

    // Release the mouse button
    await this.page.mouse.up();

    await this.page.waitForTimeout(WAIT_TIME_OUT);
  }

  async getDropHereBoxTitle() {
    return await this.dropHereBox.textContent();
  }

  async getDragMeBoxTitle() {
    return await this.dragMeBox.textContent();
  }
}

export default Droppable;
