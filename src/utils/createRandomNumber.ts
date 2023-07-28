interface IRandomNumber {
  id: string;
  value: number;
}

export const createRandomNumber = (min: number, max: number): IRandomNumber => {
  const randomNumber = min + Math.random() * (max - min);

  return {
    id: Date.now().toString(),
    value: Math.round(randomNumber),
  };
};
