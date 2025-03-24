import { useEffect, useState } from "react";
import { useColorStore } from "../../store/color";
import IColor from "../../interfaces/IColor";
import Color from "../../components/Color/Color";
import { useSearchParams } from "react-router-dom";

export default function Homepage() {
  const { fetchColors, colors } = useColorStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  useEffect(() => {
    fetchColors();
  }, [fetchColors]);

  useEffect(() => {
    if (searchTerm) {
      searchParams.set("q", searchTerm);
    } else {
      searchParams.delete("q");
    }
    setSearchParams(searchParams);
  }, [searchTerm, searchParams, setSearchParams]);

  const filteredColors = colors.filter((color: IColor) => {
    return (
      color.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      color.hex.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <div className="flex justify-center mt-8">
        <input
          type="text"
          data-testid="search-input"
          placeholder="Search by color name or hex value"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-1 border border-gray-400 rounded-md w-full max-w-md focus:outline-none focus:ring-1 focus:ring-purple-900 focus:border-purple-900"
        />
      </div>
      {!filteredColors.length && (
        <div className="flex justify-center p-4 mt-4">
          <p className="text-lg font-semibold text-purple-800 flex items-center gap-2">
            No colors to display
          </p>
        </div>
      )}
      {filteredColors.map((color: IColor) => (
        <Color key={color.id} color={color} />
      ))}
    </div>
  );
}
