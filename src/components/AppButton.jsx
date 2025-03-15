import React from 'react'

function AppButton({label = "Default"}) {
  return (
    <button className="btn">{label}</button>
  )
}

export default AppButton