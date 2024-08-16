console.log('Hello via Bun!');

function debounce<T extends (...args: any[]) => void>(
  func: T,
  waitTime: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitTime);
  };
}

// Example usage:
const saveInput = (input: string) => {
  console.log(`Saving data: ${input}`);
};

const debouncedSaveInput = debounce(saveInput, 1000);

// Simulate user typing
debouncedSaveInput('we');
debouncedSaveInput('we bare');
debouncedSaveInput('we bare bear');
