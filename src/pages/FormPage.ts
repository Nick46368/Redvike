import { Page } from '@playwright/test';

export class FormPage {
    readonly page: Page;
    readonly firstName = 'Super';
    readonly lastName = 'Bober';
    readonly email = 'super.bober@example.com';
    readonly password = 'password123';

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('https://qa-task.redvike.rocks/');
        await this.page.waitForSelector('form', { state: 'visible' });
    }

    async fillForm(firstName: string, lastName: string, email: string, password: string, confirmPassword: string) {
        await this.page.waitForSelector('input[name="first_name"]', { state: 'visible' });
        await this.page.fill('input[name="first_name"]', firstName);

        await this.page.waitForSelector('input[name="last_name"]', { state: 'visible' });
        await this.page.fill('input[name="last_name"]', lastName);

        await this.page.waitForSelector('input[name="email"]', { state: 'visible' });
        await this.page.fill('input[name="email"]', email);

        await this.page.waitForSelector('input[name="password"]', { state: 'visible' });
        await this.page.fill('input[name="password"]', password);

        await this.page.waitForSelector('input[name="confirm_password"]', { state: 'visible' });
        await this.page.fill('input[name="confirm_password"]', confirmPassword);
    }

    async fillFormWithTestData() {
        await this.fillForm(this.firstName, this.lastName, this.email, this.password, this.password);
    }

    async fillFormWithMismatchedPassword() {
        const password = 'pass123';
        const mismatchPassword = 'pass1234';

        await this.fillForm(this.firstName, this.lastName, this.email, password, mismatchPassword);
    }

    async fillFormWithShortPassword() {
        const password = 'pass123';

        await this.fillForm(this.firstName, this.lastName, this.email, password, password);
    }

    async getErrorMessage(): Promise<string> {
        const errorMessage = await this.page.textContent('body > div > ul > li');
        if (errorMessage === null) {
            throw new Error('Error message element not found');
        }
        return errorMessage;
    }

    async isSubmissionSuccessful(): Promise<boolean> {
        return this.page.url() === 'https://qa-task.redvike.rocks/success';
    }

    async submitForm() {
        await this.page.waitForSelector('input[type="submit"][value="Submit"]', { state: 'visible' });
        await this.page.click('input[type="submit"][value="Submit"]');
    }

    async verifySuccess(): Promise<string> {
        const successMessage = await this.page.innerText('body > div > h1');
        return successMessage;
    }

    async uploadAvatar(filePath: string) {
        await this.page.setInputFiles('input[name="avatar"]', filePath);
    }

}