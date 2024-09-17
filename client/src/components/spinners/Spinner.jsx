import React from 'react'
import {lineSpinner} from 'ldrs'


export function LineSpinner({size,color}) {
lineSpinner.register()
return (
<><l-line-spinner
  size={size || "40"}
  stroke="3"
  speed="1" 
  color={color || "black"} 
></l-line-spinner></>
  )
}



