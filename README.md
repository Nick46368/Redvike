# Automated Test Suite for Form Submission

This repository contains the automated tests for the form submission feature of our web application. The tests cover various functionalities including user input validation, avatar image upload, and captcha verification, ensuring robustness and reliability of the form submission process.

## Getting Started

These instructions will guide you through getting a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your system:
- Node.js (v14 or newer)
- npm (usually comes with Node.js)

Check the installed versions with:
```bash
node -v
npm -v
```

### Installing

To install the required dependencies:
1. Clone the repository to your local machine.
2. Navigate to the project's root directory.
3. Run the following command:
   ```bash
   npm install
   ```
   This will install all dependencies listed in `package.json`.

## Running the Tests

Execute the automated tests using Playwright with the command:

```bash
for headless mode: npm run test

for headed mode: npm run test-ui
```

This will run all tests located within the `tests` directory.

### Test Structure

The tests are organized in the `tests` directory, with key components structured as follows:
- `FormPage.ts`: Page Object Model for handling interactions on the form page.
- `SuccessPage.ts`: Page Object Model for validations on the success page after form submission.
- `SliderCaptcha.ts`: Utility class to automate the slider captcha interaction.
- `submissionForm.spec.ts`: Main test suite file containing various test scenarios.

## Test Cases

The suite includes the following test scenarios:

1. **Submit Form with Valid Data**: Validates successful form submission, including the correct display of success messages and data verification on the success page.
2. **Negative Test Cases**: Tests for common form errors, such as mismatched passwords and inadequate password lengths.
3. **Avatar Upload**: Tests the functionality for uploading different avatar image formats and verifies their correct display.

## Technology Stack

- **[Playwright](https://playwright.dev/)**: For cross-browser testing and automation.
- **[TypeScript](https://www.typescriptlang.org/)**: For writing test scripts with strong typing support.

## Author

- **[Nikita](https://github.com/YourGithubProfile)** - Initial work and test suite development.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
### Enhancements:

- **Expanded Overview**: Provides a more detailed description of what the test suite covers.
- **Step-by-step Installation Guide**: Clarifies the installation process, including cloning the repository.
- **Detailed Test Structure**: Breaks down the structure of the test suite for better understanding.
- **Comprehensive Test Case Descriptions**: Elaborates on the scenarios covered by the test suite.
- **Technology Stack Section**: Highlights the primary technologies used in the project.