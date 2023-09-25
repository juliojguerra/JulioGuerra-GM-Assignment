import { Locator, Page } from "@playwright/test";
import ElementsPage from "./ElementsPage";
import FormsPage from "./FormsPage";
import WidgetsPage from "./WidgetsPage";
import InteractionsPage from "./InteractionsPage";

class HomePage {
  page: Page;
  elementsHeading: Locator;
  formsHeading: Locator;
  widgetsHeading: Locator;
  interactionsHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.elementsHeading = this.page.getByRole("heading", { name: "Elements" });
    this.formsHeading = this.page.getByRole("heading", { name: "Forms" });
    this.widgetsHeading = this.page.getByRole("heading", { name: "Widgets" });
    this.interactionsHeading = this.page.getByRole("heading", {
      name: "Interactions",
    });
  }

  async go() {
    await this.page.goto("/");
  }

  async navigateToElements() {
    await this.elementsHeading.click();
    return new ElementsPage(this.page);
  }

  async navigateToForms() {
    await this.formsHeading.click();
    return new FormsPage(this.page);
  }

  async navigateToWidget() {
    await this.widgetsHeading.click();
    return new WidgetsPage(this.page);
  }

  async navigateToInteractions() {
    await this.interactionsHeading.click();
    return new InteractionsPage(this.page);
  }
}

export default HomePage;
