import React from 'react'

const EtapaIntermedia = ({
  currentStep,
  handleChange
}) => {
  if (currentStep !== 4) {
    return null
  }
  return (
      <h1>Etapa Intermedia</h1>
  )
}

export default EtapaIntermedia