export const createRandomNumber = (min: number, max: number/*, fraction = false*/): number => {
  const randomNumber = min + Math.random() * (max - min);

  // if (fraction) {
  //   return parseFloat(randomNumber.toFixed(3));
  // }

  return Math.round(randomNumber);
};
