"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export function AnimatedSwitch({ id, checked, onCheckedChange, disabled }) {
  const [isOn, setIsOn] = useState(checked || false)

  const handleToggle = () => {
    if (disabled) return
    const newState = !isOn
    setIsOn(newState)
    if (onCheckedChange) onCheckedChange(newState)
  }

  return (
<button
  onClick={handleToggle}
  className={`relative w-12 h-7 rounded-full p-1 flex ${
    isOn
      ? "justify-end bg-[hsl(var(--primary))]"
      : "justify-start bg-gray-300 dark:bg-gray-600"
  }`}
>
  <motion.div
    layout
    transition={{ type: "spring", stiffness: 500, damping: 30 }}
    className="w-5 h-5 rounded-full shadow
               bg-white dark:bg-black"
  />
</button>


  )
}
