import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class SelectBankPage extends BasePage{
    constructor(page: Page) {
        super(page);
    }

    private provider(providerName: string) {
        return this.page.getByTestId(providerName);
    }

    async selectProvider(providerName: string) {
        await this.provider(providerName).click();
    }
}