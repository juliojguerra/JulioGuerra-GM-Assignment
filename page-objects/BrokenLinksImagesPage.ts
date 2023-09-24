import { Locator, Page } from "@playwright/test";

class BrokenLinksImagesPage {
  page: Page;
  firstBrokenImage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstBrokenImage = this.page.locator(
      "//p[normalize-space()='Broken image']/following-sibling::img[1]"
    );
  }

  getFirstBrokenImage() {
    return this.firstBrokenImage;
  }
}

export default BrokenLinksImagesPage;
