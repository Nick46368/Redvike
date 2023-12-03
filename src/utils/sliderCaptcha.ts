import { Page } from '@playwright/test';

export class SliderCaptcha {
  private page: Page;
  private sliderSelector: string;
  private trackSelector: string;

  constructor(page: Page, sliderSelector: string, trackSelector: string) {
    this.page = page;
    this.sliderSelector = sliderSelector;
    this.trackSelector = trackSelector;
  }

  async slideToEnd(): Promise<void> {
    await this.page.waitForSelector(this.sliderSelector, { state: 'visible' });
    const sliderHandle = await this.page.$(this.sliderSelector);

    await this.page.waitForSelector(this.trackSelector, { state: 'visible' });
    const sliderTrack = await this.page.$(this.trackSelector);

    if (sliderHandle && sliderTrack) {
      const handleBoundingBox = await sliderHandle.boundingBox();
      const trackBoundingBox = await sliderTrack.boundingBox();

      if (handleBoundingBox && trackBoundingBox) {
        const targetX = trackBoundingBox.x + trackBoundingBox.width - handleBoundingBox.width / 2;

        await sliderHandle.hover();
        await this.page.mouse.down();
        await this.page.mouse.move(targetX, handleBoundingBox.y + (handleBoundingBox.height / 2), { steps: 10 });
        await this.page.mouse.up();

        await this.page.waitForSelector('#slider-thumb:has-text("Unlocked")');
      }
    }
  }

  static async solve(page: Page): Promise<void> {
    const sliderCaptcha = new SliderCaptcha(page, 'div#slider-thumb', 'div#slider-track');
    await sliderCaptcha.slideToEnd();
  }
}
