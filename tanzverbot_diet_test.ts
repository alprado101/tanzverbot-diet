import { assertGreater, assertEquals } from "@std/assert";
import { calcDateOnDiet, Sex } from "./tanzverbot_diet.ts";

Deno.test("Tanzverbot Diet", () => {
  assertGreater(calcDateOnDiet(74, 100, 1.86, 38, Sex.Male), 0.0);
});

Deno.test("Rechne Dauer aus", () => {
  // Test: 80kg auf 85kg, 1.80m, 25 Jahre, Mann
  const tage = calcDateOnDiet(80, 85, 1.8, 25, Sex.Male);
  assertEquals(tage, 7);
});


