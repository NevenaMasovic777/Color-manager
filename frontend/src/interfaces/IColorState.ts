import IColor from "./IColor";

export interface ColorState {
  colors: IColor[];
  setColors: (colors: IColor[]) => void;
  fetchColors: () => Promise<{ success: boolean; message: string } | undefined>;
  createColor: (
    newColor: IColor
  ) => Promise<{ success: boolean; message: string }>;
  updateColor: (
    id: string,
    color: IColor
  ) => Promise<{ success: boolean; message: string }>;
  deleteColor: (id: string) => Promise<{ success: boolean; message: string }>;
}
