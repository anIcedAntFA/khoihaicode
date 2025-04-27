function findMostFrequentNumber(nums: number[]): number {
  const frequency: Record<string, number> = {};
  let maxCount = 0;
  let mostFrequentNum = nums[0];

  for (let i = 0; i < nums.length; i++) {
    const currentNum = nums[i];

    if (frequency[nums[i]]) {
      frequency[nums[i]]++;
    } else {
      frequency[nums[i]] = 1;
    }

    if (frequency[currentNum] > maxCount) {
      maxCount = frequency[currentNum];
      mostFrequentNum = currentNum;
    }
  }

  return mostFrequentNum;
}

findMostFrequentNumber([1, 2, 3, 4, 2, 2, 3, 2]);
