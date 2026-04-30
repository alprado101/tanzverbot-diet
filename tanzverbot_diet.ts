export enum Sex {
  Male = "m",
  Female = "f",
}

interface Food {
  name: string;
  calories: number;
  servings: number;
}

const FOODS: Food[] = [
  { name: "Kellogg's Tresor", calories: 137, servings: 4 },
  { name: "Weihenstephan Haltbare Milch", calories: 64, servings: 8 },
  { name: "Mühle Frikadellen", calories: 271, servings: 4 },
  { name: "Volvic Tee", calories: 40, servings: 12 },
  { name: "Neuburger lockerer Sahnepudding", calories: 297, servings: 1 },
  { name: "Lagnese Viennetta", calories: 125, servings: 6 },
  { name: "Schöller 10ForTwo", calories: 482, servings: 2 },
  { name: "Ristorante Pizza Salame", calories: 835, servings: 2 },
  { name: "Schweppes Ginger Ale", calories: 37, servings: 25 },
  { name: "Mini Babybel", calories: 59, servings: 20 },
];

export function calcDateOnDiet(
  currentWeightKg: number,
  targetWeightKg: number,
  heightM: number,
  ageY: number,
  sex: Sex,
): number {
  const weightGainKg = targetWeightKg - currentWeightKg;
  const averageWeightKg = (currentWeightKg + targetWeightKg) / 2;
  if (weightGainKg < 0) {
    throw new Error(`This diet is for gaining weight, not loosing it!`);
  }
  // TODO: Diesen Check in eine eigene kleine Funktion schieben
  if (ageY < 16 || heightM < 1.5) {
    throw new Error(`You do not qualify for this kind of diet.`);
  }
  let dailyCaloriesOnDiet = 0;
  for (const food of FOODS) {
    dailyCaloriesOnDiet += food.calories * food.servings;
  }
  let dailyCaloriesBasicMetabolicRate = 0;
  // TODO: Die Formel für Kalorien in eine eigene Funktion auslagern
  const meterToCm = 100.0;
  if (sex == Sex.Male) {
    dailyCaloriesBasicMetabolicRate = Math.ceil(
      // Harris-Benedict-Formula (Male)
      66.47 +
        13.7 * averageWeightKg +
        5.003 * heightM * meterToCm -
        6.75 * ageY,
    );
  } else {
    dailyCaloriesBasicMetabolicRate = Math.ceil(
      // Harris-Benedict-Formula (Female)
      655.1 +
        9.563 * averageWeightKg +
        1.85 * heightM * meterToCm -
        4.676 * ageY,
    );
  }
  const dailyExcessCalories =
    dailyCaloriesOnDiet - dailyCaloriesBasicMetabolicRate;
  const KcalPerKgFat = 9000;
  if (dailyExcessCalories <= 0) {
    throw new Error("This diet is not sufficient for you to gain weight.");
  }
  return Math.ceil((KcalPerKgFat * weightGainKg) / dailyExcessCalories);
}
