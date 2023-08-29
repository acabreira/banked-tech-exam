import { test } from "@playwright/test";
import { NewCustomerPage } from "../pages/newCustomer.page";
import { SelectBankPage } from "../pages/selectBank.page";
import { BankDetailsPage } from "../pages/bankDetails.page";
require('dotenv').config();

const providerName = 'Mock Bank'

const successScenarios = [
    {
        testName: 'Successful payment with agreement and payment default delay',
        bankeDetails: {
            accountName: 'john doe',
            bsbNumber: '111-114',
            accountNumber: '12345678'
        }
    },
    {
        testName: 'Successful payment with agreement and payment delay',
        bankeDetails: {
            accountName: 'john doe',
            bsbNumber: '111-114',
            accountNumber: '101011'
        }
    }
]

successScenarios.forEach( scenario => {
    test(scenario.testName, async ( { page }) => {
        const newCustomerPage = new NewCustomerPage(page);
        const selectBankPage = new SelectBankPage(page);
        const bankDetailsPage = new BankDetailsPage(page);

        await newCustomerPage.goToUrlAndClickCreateHostedCheckout(
            process.env.URL as string, 
            process.env.REGION as string
        );

        await selectBankPage.selectProvider(providerName);

        await bankDetailsPage.submitBankDetails(scenario.bankeDetails);
        await bankDetailsPage.verifyAgreementIsReady();
        await bankDetailsPage.verifyPaymentIsSuccessful();
    })
})

test('Agreement creation fail', async ( { page }) => {
    const newCustomerPage = new NewCustomerPage(page);
    const selectBankPage = new SelectBankPage(page);
    const bankDetailsPage = new BankDetailsPage(page);

    await newCustomerPage.goToUrlAndClickCreateHostedCheckout(
        process.env.URL as string, 
        process.env.REGION as string
    );

    await selectBankPage.selectProvider(providerName);

    await bankDetailsPage.submitBankDetails(
        {
            accountName: 'john doe',
            bsbNumber: '111-114',
            accountNumber: '010112'
        }
    )
    await bankDetailsPage.verifyPaymentFailed();
})

test('Insufficient funds', async ( { page }) => {
    const newCustomerPage = new NewCustomerPage(page);
    const selectBankPage = new SelectBankPage(page);
    const bankDetailsPage = new BankDetailsPage(page);

    await newCustomerPage.goToUrlAndClickCreateHostedCheckout(
        process.env.URL as string, 
        process.env.REGION as string
    );

    await selectBankPage.selectProvider(providerName);

    await bankDetailsPage.submitBankDetails(
        {
            accountName: 'john doe',
            bsbNumber: '111-114',
            accountNumber: '010124'
        }
    )
    await bankDetailsPage.verifyInsufficientFunds();
})