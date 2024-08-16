# Debounce and Throttling

## Debouncing

> Debouncing is a technique that delays the execution of a function until the user stops performing a certain action for a specified amount of time.

- Debouncing is a programming practice used to ensure that time-consuming tasks do not fire so often, thus improving performance.
- It limits the rate at which a function can fire.
- For example, it can be used to limit the number of times a function is called when a user types in an input field.

```ts
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Example usage:
const saveInput = (input: string) => {
  console.log(`Saving data: ${input}`);
};

const debouncedSaveInput = debounce(saveInput, 500);

// Simulate user typing
debouncedSaveInput('we');
debouncedSaveInput('we bare');
debouncedSaveInput('we bare bear');
```
