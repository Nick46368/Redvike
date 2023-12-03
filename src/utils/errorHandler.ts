export function handleError(error: unknown) {
  if (error instanceof Error) {
    console.error(`Test failed with error: ${error.message}`);
  } else {
    console.error('An unexpected error occurred:', error);
  }
}