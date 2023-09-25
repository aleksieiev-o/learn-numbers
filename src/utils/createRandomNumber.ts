interface IRandomNumber {
  id: string;
  value: number;
}

let previousRandomNumber = -1;

export const createRandomNumber = (min: number, max: number): IRandomNumber => {
  let randomNumber = -1;

  do {
    randomNumber = Math.round(min + Math.random() * (max - min));
  } while (randomNumber === previousRandomNumber);

  previousRandomNumber = randomNumber;

  return {
    id: Date.now().toString(),
    value: randomNumber,
  };
};
