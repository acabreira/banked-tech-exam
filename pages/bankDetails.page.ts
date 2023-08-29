import { BasePage } from "./base.page";
import { Page } from "@playwright/test";

interface BankDetails {
    accountName: string,
    bsbNumber: string,
    accountNumber: string
}
export class BankDetailsPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private inputAccountName() {
        return this.page.getByTestId('ACCOUNT_NAME');
    }

    private inputBsbNumber() {
        return this.page.getByTestId('BSB_NUMBER');
    }

    private inputAccountNumber() {
        return this.page.getByTestId('ACCOUNT_NUMBER');
    }

    private continueButton() {
        return this.page.getByTestId('supplemental-attr-form-submit');
    }

    private agreementReady() {
        return this.page.getByTestId('provider-required-payer-action').filter({hasText: "Your agreement is ready"});
    }

    private paymenSuccessful() {
        return this.page.getByTestId('payment-completed');
    }

    private paymentFailed() {
        return this.page.getByTestId('payment-failed').filter({ hasText: "Payment Failed" });
    }

    private insufficientFunds() {
        return this.page.getByTestId('payment-failed').filter({ hasText: 'Insufficient funds' })
    }

    async fillBankDetails(bankDetails: BankDetails) {
        await this.inputAccountName().fill(bankDetails.accountName);
        await this.inputBsbNumber().fill(bankDetails.bsbNumber);
        await this.inputAccountNumber().fill(bankDetails.accountNumber);
    }

    async submitBankDetails(bankDetails: BankDetails) {
        await this.fillBankDetails(bankDetails);
        await this.continueButton().click();
    }

    async verifyAgreementIsReady() {
        await this.agreementReady().waitFor({ state: "visible", timeout: 20000 });
    }
    async verifyPaymentIsSuccessful() {
        await this.paymenSuccessful().waitFor({ state: "visible", timeout: 20000 });
    }

    async verifyPaymentFailed(){
        await this.paymentFailed().waitFor({ state: "visible", timeout: 20000 });
    }

    async verifyInsufficientFunds() {
        await this.insufficientFunds().waitFor({ state: "visible", timeout: 20000 });
    }
}