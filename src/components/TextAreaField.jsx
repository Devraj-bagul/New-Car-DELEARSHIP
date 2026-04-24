import React from 'react'
import { Textarea } from "@/components/ui/textarea"

const TextAreaField = ({item, handleInputChange, carInfo}) => {
  return (
    <div>
      <Textarea 
        onChange={(e)=> handleInputChange(item.name,e.target.value)} 
        required={item.required}
        defaultValue={carInfo?.[item.name]}
        className="min-h-[150px] bg-secondary/20 border-border focus:ring-2 focus:ring-gold focus:border-gold rounded-2xl transition-all duration-300 p-4"
      />
    </div>
  )
}

export default TextAreaField
