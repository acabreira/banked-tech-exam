import { Page } from '@playwright/test'
import { BasePage } from './base.page';

export class NewCustomerPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private regionSelector() {
        return this.page.getByTestId('region-selector');
    }

    private createHostedCheckoutButton() {
        return this.page.getByTestId('create-hosted-checkout');
    }

    async selectRegion(region: string) {
        await this.regionSelector().selectOption(region);
    }

    async clickCreateHostedCheckoutButton() {
        await this.createHostedCheckoutButton().click();
    }

    async goToUrlAndClickCreateHostedCheckout(url: string, region: string) {
        await this.page.goto(url);
        await this.selectRegion(region);
        await this.clickCreateHostedCheckoutButton();
    }
}