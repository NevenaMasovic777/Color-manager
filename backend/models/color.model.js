import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const p = path.join(__dirname, "..", "data", "colors.json");

const getColorsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

export class Color {
  constructor(id, name, hex) {
    this.id = id;
    this.name = name;
    this.hex = hex;
  }

  save() {
    getColorsFromFile((colors) => {
      if (this.id) {
        const existingColorIndex = colors.findIndex(
          (color) => color.id === this.id
        );

        if (existingColorIndex !== -1) {
          const existingColor = colors[existingColorIndex];
          console.log(existingColor);

          colors[existingColorIndex] = {
            id: existingColor.id,
            name: this.name || existingColor.name,
            hex: this.hex || existingColor.hex,
          };
        }

        fs.writeFile(p, JSON.stringify(colors), (err) => {
          if (err) {
            console.error("Error saving updated color:", err);
          }
        });
      } else {
        this.id = Math.random().toString();
        colors.push(this);
        fs.writeFile(p, JSON.stringify(colors), (err) => {
          if (err) {
            console.error("Error saving new color:", err);
          }
        });
      }
    });
  }

  static deleteById(id) {
    getColorsFromFile((colors) => {
      const updatedColors = colors.filter((c) => c.id !== id);
      fs.writeFile(p, JSON.stringify(updatedColors), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getColorsFromFile(cb);
  }
}
