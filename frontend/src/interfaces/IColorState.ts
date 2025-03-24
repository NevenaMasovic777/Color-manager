import IColor from "./IColor";

export interface ColorState {
  colors: IColor[]; // Array of colors
  setColors: (colors: IColor[]) => void; // Function to set colors
  fetchColors: () => Promise<{ success: boolean; message: string } | undefined>; // Function to fetch colors
  createColor: (
    newColor: IColor
  ) => Promise<{ success: boolean; message: string }>; // Function to create a color
  updateColor: (
    id: string,
    color: IColor
  ) => Promise<{ success: boolean; message: string }>; // Function to update a color
  deleteColor: (id: string) => Promise<{ success: boolean; message: string }>; // Function to delete a color
}
