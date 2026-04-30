export enum Sex {
  Male = "m",
  Female = "f",
}

// TODO: Die drei Listen unten zu einer Liste mit Objekten machen
const foodNames: string[] = [
  "Kellogg's Tresor",
  "Weihenstephan Haltbare Milch",
  "Mühle Frikadellen",
  "Volvic Tee",
  "Neuburger lockerer Sahnepudding",
  "Lagnese Viennetta",
  "Schöller 10ForTwo",
  "Ristorante Pizza Salame",
  "Schweppes Ginger Ale",
  "Mini Babybel",
];
const foodCalories: number[] = [137, 64, 271, 40, 297, 125, 482, 835, 37, 59];
const foodServings: number[] = [4, 8, 4, 12, 1, 6, 2, 2, 25, 20];

export function calcDateOnDiet(
  currentWeightKg: number,
  targetWeightKg: number,
  heightM: number,
  ageY: number,
  sex: Sex,
): number {
  const weightGainKg = targetWeightKg - currentWeightKg;
  if (weightGainKg < 0) {
    throw new Error(`This diet is for gaining weight, not loosing it!`);
  }
  // TODO: Diesen Check in eine eigene kleine Funktion schieben
  if (ageY < 16 || heightM < 1.5) {
    throw new Error(`You do not qualify for this kind of diet.`);
  }
  let dailyCaloriesOnDiet = 0;
  // TODO: Die Schleife schöner schreiben (ohne index)
  for (const index in foodNames) {
    const calories = foodCalories[index] || 0;
    const servings = foodServings[index] || 0;
    dailyCaloriesOnDiet += calories * servings;
  }
  let dailyCaloriesBasicMetabolicRate = 0;
  // TODO: Die Formel für Kalorien in eine eigene Funktion auslagern
  if (sex == Sex.Male) {
    dailyCaloriesBasicMetabolicRate = Math.ceil(
      // Harris-Benedict-Formula (Male)
      // TODO: Zahlen wie 66.47 Namen geben (Konstanten)
      66.47 + 13.7 * currentWeightKg + 5.003 * heightM * 100.0 - 6.75 * ageY,
    );
  } else {
    dailyCaloriesBasicMetabolicRate = Math.ceil(
      // Harris-Benedict-Formula (Female)
      655.1 + 9.563 * currentWeightKg + 1.85 * heightM * 100.0 - 4.676 * ageY,
    );
  }
  const dailyExcessCalories =
    dailyCaloriesOnDiet - dailyCaloriesBasicMetabolicRate;
  if (dailyExcessCalories <= 0) {
    throw new Error("This diet is not sufficient for you to gain weight.");
  }
  // TODO: Die Zahl 9000 als Konstante speichern
  return Math.ceil((9000 * weightGainKg) / dailyExcessCalories);
}
