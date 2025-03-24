import { create } from "zustand";
import axios, { AxiosError } from "axios";
import IColor from "../interfaces/IColor";
import { ColorState } from "../interfaces/IColorState";

export const useColorStore = create<ColorState>((set) => ({
  colors: [],
  setColors: (colors: IColor[]) => set({ colors }),
  fetchColors: async () => {
    try {
      const response = await axios.get<IColor[]>("/api/colors");
      set({ colors: response.data });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return {
          success: false,
          message: error.response?.data?.error || "An unknown error occurred",
        };
      }
      return { success: false, message: "An unknown error occurred" };
    }
  },
  createColor: async (newColor: IColor) => {
    try {
      const response = await axios.post("/api/colors", newColor, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      set((state: { colors: IColor[] }) => ({
        colors: [...state.colors, response.data],
      }));
      return { success: true, message: "Color successfully created" };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return {
          success: false,
          message: error.response?.data?.error || "An unknown error occurred",
        };
      }
      return { success: false, message: "An unknown error occurred" };
    }
  },
  updateColor: async (id: string, color: IColor) => {
    try {
      const response = await axios.put<IColor>(`api/colors/${id}`, color);
      set((state: { colors: IColor[] }) => ({
        colors: state.colors.map((color: IColor) =>
          color.id === id ? response.data : color
        ),
      }));
      return { success: true, message: "Color successfully updated" };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return {
          success: false,
          message: error.response?.data?.error || "An unknown error occurred",
        };
      }
      return { success: false, message: "An unknown error occurred" };
    }
  },
  deleteColor: async (id: string) => {
    try {
      await axios.delete<IColor>(`api/colors/${id}`);
      set((state: { colors: IColor[] }) => ({
        colors: state.colors.filter((color: IColor) => color.id !== id),
      }));
      return { success: true, message: "Color successfully deleted" };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return {
          success: false,
          message: error.response?.data?.error || "An unknown error occurred",
        };
      }
      return { success: false, message: "An unknown error occurred" };
    }
  },
}));
