import colors from "tailwindcss/colors.js";
import { parseToHsl } from "polished";
import { writeFileSync } from "node:fs";
import kebabCase from "lodash.kebabcase";

const result = Object.fromEntries(
  Object.entries(colors)
    .filter(([name, palette]) => {
      return (
        typeof palette !== "string" &&
        !["lightBlue", "blueGray", "coolGray", "trueGray", "warmGray"].includes(
          name,
        )
      );
    })
    .map(([name, palette]) => {
      return [
        name,
        Object.fromEntries(
          Object.entries(palette).map(([step, hex]) => {
            const { hue, saturation, lightness } = parseToHsl(hex);
            return [
              `--color-${kebabCase(name)}-${step}`,
              `${hue.toFixed(2)}deg ${(saturation * 100).toFixed(2)}% ${(
                lightness * 100
              ).toFixed(2)}%`,
            ];
          }),
        ),
      ];
    }),
);

writeFileSync("colors.json", JSON.stringify(result, null, 2), "utf-8");
