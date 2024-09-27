import React from "react";

interface FilterProps {
  availableOnly: boolean;
  priceRange: { min: number; max: number };
  brand: string;
  category: string;
  handleSetAvailableOnly: () => void;
  handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>, category: "min" | "max") => void;
  handleBrandChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  resetFilters: () => void;
}

const Filter: React.FC<FilterProps> = ({
  availableOnly,
  priceRange,
  brand,
  category,
  handleSetAvailableOnly,
  handlePriceChange,
  handleBrandChange,
  handleCategoryChange,
  resetFilters,
}) => {
  return (

      <div className="p-4 rounded-lg border border-gray-100 shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold mb-4">فیلتر ها</h3>
          <button onClick={resetFilters}>حذف فیلتر</button>
        </div>

        {/* Brand Filter */}
        <div className="mb-4">
          <label className="block mb-2">برند</label>
          <select value={brand} onChange={handleBrandChange} className="w-full border rounded-lg p-2">
            <option value="all">همه</option>
            <option value="cheetoz">مزمز</option>
            <option value="golestan">گلستان</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="mb-4">
          <label className="block mb-2">نوع</label>
          <select value={category} onChange={handleCategoryChange} className="w-full border rounded-lg p-2">
            <option value="all">همه</option>
            <option value="Dairy">لبنیات</option>
            <option value="Snacks">تنقلات</option>
          </select>
        </div>

        {/* Availability Filter */}
        <div className="mb-4 flex justify-between">
          <label className="mb-2">فقط محصولات موجود</label>
          <div className="flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={handleSetAvailableOnly}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
        {/* Price Filter */}
        <div className="mb-4">
          <label className="block mb-2">رنج قیمت</label>
          <div className="flex items-center mb-2">
            <input
              type="number"
              value={priceRange.min}
              min="0"
              max="500000"
              onChange={e => handlePriceChange(e, "min")}
              className="border rounded-lg p-2 w-1/2 mr-2"
            />
            <span className="mx-2">تا</span>
            <input
              type="number"
              value={priceRange.max}
              min="0"
              max="500000"
              onChange={e => handlePriceChange(e, "max")}
              className="border rounded-lg p-2 w-1/2"
            />
          </div>
          <div className="text-sm mt-2">حداکثر قیمت: {priceRange.max.toLocaleString()} تومان</div>
        </div>
      </div>
  );
};

export default Filter;
