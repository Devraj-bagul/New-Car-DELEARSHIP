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
        <SelectTrigger className="w-full">
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
