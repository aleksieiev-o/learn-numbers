export const createRandomNumber = (min: string, max: string/*, fraction = false*/): number => {
  // TODO Check input from NumberInput value 'e'. Tips '1e10';
  const randomNumber = parseInt(min, 10) + Math.random() * (parseInt(max, 10) - parseInt(min, 10));

  // if (fraction) {
  //   return parseFloat(randomNumber.toFixed(3));
  // }

  return Math.round(randomNumber);
};
