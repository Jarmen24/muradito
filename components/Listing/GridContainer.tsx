import React from 'react'

const GridContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`grid grid-cols-4 gap-2 ${className}`}>
        {children}
    </div>
  )
}

export default GridContainer