import { Input } from "@/components/ui/input";
import React from "react";

function InputField({ item, handleInputChange, carInfo }) {
  return (
    <div>
      <Input
        type={item?.fieldType}
        name={item?.name}
        required={item?.required}
        defaultValue={carInfo?.[item.name]}
        onChange={(e) => handleInputChange(item.name, e.target.value)}
        className="h-12 md:h-14 bg-secondary/20 border-border focus:ring-2 focus:ring-gold focus:border-gold rounded-2xl transition-all duration-300"
      />
    </div>
  );
}

export default InputField;
