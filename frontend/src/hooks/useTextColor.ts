import { useMemo } from "react";

const isColorLight = (hex: string) => {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5; // Light if > 0.5
};

const isPureColor = (r: number, g: number, b: number): boolean => {
  return (
    (r === 255 && g === 0 && b === 0) ||
    (r === 0 && g === 255 && b === 0) ||
    (r === 0 && g === 0 && b === 255)
  );
};

const adjustBrightness = (hex: string, factor: number) => {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  if (r + g + b <= 40) {
    return "rgb(255, 255, 255)";
  }

  r = Math.min(255, Math.max(0, Math.round(r * factor)));
  g = Math.min(255, Math.max(0, Math.round(g * factor)));
  b = Math.min(255, Math.max(0, Math.round(b * factor)));

  return `rgb(${r}, ${g}, ${b})`;
};

export const useTextColor = (bgColor: string) => {
  return useMemo(() => {
    const r = parseInt(bgColor.substring(1, 3), 16);
    const g = parseInt(bgColor.substring(3, 5), 16);
    const b = parseInt(bgColor.substring(5, 7), 16);

    if (isPureColor(r, g, b)) {
      return "#FFFFFF";
    } else {
      const lightBg = isColorLight(bgColor);
      return lightBg
        ? adjustBrightness(bgColor, 0.2)
        : adjustBrightness(bgColor, 5);
    }
  }, [bgColor]);
};
