import { test, expect } from '@playwright/test';
import { FormPage } from '../src/pages/FormPage';
import { SuccessPage } from '../src/pages/SuccessPage';
import { SliderCaptcha } from '../src/utils/sliderCaptcha';
import { handleError } from '../src/utils/errorHandler'

const negativeCases = [
  {
    testCaseNumber: '2',
    description: 'Mismatched password',
    fillFormMethod: async (formPage: FormPage) => formPage.fillFormWithMismatchedPassword(),
    expectedError: 'Passwords do not match!',
    solveCaptcha: true
  },
  {
    testCaseNumber: '2',
    description: 'Short password',
    fillFormMethod: async (formPage: FormPage) => formPage.fillFormWithShortPassword(),
    expectedError: 'Password must be at least 8 characters long!',
    solveCaptcha: true
  },
  {
    testCaseNumber: '3',
    description: 'Captcha error',
    fillFormMethod: async (formPage: FormPage) => formPage.fillFormWithTestData(),
    expectedError: 'Please solve the captcha!',
    solveCaptcha: false
  }
];
const imagePath = './src/testImages';
const imageFiles = ['1.jpg', '1.jpeg', '1.png', '1.bmp', '1.gif'];

test.describe('Form Submission Tests', () => {
  let formPage: FormPage;
  let successPage: SuccessPage;

  test.beforeEach(async ({ page }) => {
    formPage = new FormPage(page);
    successPage = new SuccessPage(page);
    await formPage.navigate();
  });

  test('Test Case 1. Submit form with valid data without avatar and verify success', async ({ page }) => {
    try {
      await formPage.fillFormWithTestData();

      await SliderCaptcha.solve(formPage.page);

      await formPage.submitForm();

      const successMessage = await formPage.verifySuccess();
      expect(successMessage).toContain('Successful Form Submissions');

      const retrievedName = await successPage.getName();
      expect(retrievedName).toBe(`${formPage.firstName} ${formPage.lastName}`);

      const retrievedEmail = await successPage.getEmail();
      expect(retrievedEmail).toBe(formPage.email);

      const avatarText = await successPage.getAvatarText();
      expect(avatarText).toContain('No Avatar Uploaded');
    } catch (error) {
      handleError(error);
      throw error;
    }
  });

  for (const testCase of negativeCases) {
    test(`Test Case ${testCase.testCaseNumber}. Submit form with invalid data: ${testCase.description}`, async ({ page }) => {
      try {
        await testCase.fillFormMethod(formPage);

        if (testCase.solveCaptcha) {
          await SliderCaptcha.solve(formPage.page);
        }

        await formPage.submitForm();

        const isSubmissionSuccessful = await formPage.isSubmissionSuccessful();
        expect(isSubmissionSuccessful).toBeFalsy();

        const errorMessage = await formPage.getErrorMessage();
        expect(errorMessage).toContain(testCase.expectedError);
      } catch (error) {
        handleError(error);
        throw error;
      }
    });
  }

  for (const imageFile of imageFiles) {
    test(`Submit form with avatar image ${imageFile} and verify success`, async ({ page }) => {
      try {
        await formPage.fillFormWithTestData();

        await SliderCaptcha.solve(formPage.page);

        await formPage.uploadAvatar(`${imagePath}/${imageFile}`);

        await formPage.submitForm();

        const successMessage = await formPage.verifySuccess();
        expect(successMessage).toContain('Successful Form Submissions');

        const imageExtension = imageFile.split('.').pop() || '';
        const isImageDisplayed = await successPage.isImageDisplayed(imageExtension);
        expect(isImageDisplayed).toBeTruthy();
      } catch (error) {
        handleError(error);
        throw error;
      }
    });
  }
});
