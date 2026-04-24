import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DropdownField = ({ item, handleInputChange, carInfo }) => {
  return (
    <div>
      <Select
        onValueChange={(value) => handleInputChange(item.name, value)}
        required={item.required}
        defaultValue={carInfo?.[item?.name]}
      >
        <SelectTrigger className="w-full h-12 md:h-14 bg-secondary/20 border-border focus:ring-2 focus:ring-gold focus:border-gold rounded-2xl transition-all duration-300">
          <SelectValue
            placeholder={
              carInfo?.[item?.name] ? carInfo?.[item?.name] : item.label
            }
          />
        </SelectTrigger>

        {/* ⭐ Scrollable Dropdown Added */}
        <SelectContent className="max-h-60 overflow-y-auto">
          {item?.options?.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DropdownField;
