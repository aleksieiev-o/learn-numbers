export const createRandomNumber = (min: number, max: number/*, fraction = false*/): number => {
  // TODO Check input from NumberInput value 'e'. Tips '1e10';
  const randomNumber = min + Math.random() * (max - min);

  // if (fraction) {
  //   return parseFloat(randomNumber.toFixed(3));
  // }

  return Math.round(randomNumber);
};
