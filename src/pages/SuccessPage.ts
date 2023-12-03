import { Page } from '@playwright/test';

export class SuccessPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getName(): Promise<string> {
    await this.page.waitForSelector('ul > li:has-text("Name:")', { state: 'visible' });
    const nameText = await this.page.textContent('ul > li:has-text("Name:")');
    if (nameText === null) {
      throw new Error('Name element not found');
    }
    return nameText.split('Email:')[0].split('Name:')[1].trim();
  }

  async getEmail(): Promise<string> {
    await this.page.waitForSelector('ul > li:has-text("Email:")', { state: 'visible' });
    const emailText = await this.page.textContent('ul > li:has-text("Email:")');
    if (emailText === null) {
      throw new Error('Email text not found');
    }
    return emailText.split('Email:')[1].split('Avatar:')[0].trim();
  }

  async getAvatarText(): Promise<string> {
    await this.page.waitForSelector('ul > li:has-text("Avatar:")', { state: 'visible' });
    const avatarText = await this.page.textContent('ul > li:has-text("Avatar:")');
    if (avatarText === null) {
      throw new Error('Avatar text element not found');
    }
    return avatarText;
  }

  async isImageDisplayed(imageExtension: string): Promise<boolean> {
    await this.page.waitForSelector(`img[src$=".${imageExtension}"]`, { state: 'visible' });

    const images = await this.page.$$('img');
    for (const image of images) {
      const src = await image.getAttribute('src');
      if (src && src.endsWith(`.${imageExtension}`)) {
        return true;
      }
    }
    return false;
  }
}
