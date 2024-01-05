import React from "react";
import avisoPrivacidadPdf from "../assets/avisoDePrivacidad.pdf";

function AvisoPrivavidad() {
  return (
    <div className="pdf-container">
      <iframe
      title="Aviso de Privacidad"
      src={avisoPrivacidadPdf}
      width="100%"
      height="100%" />

    </div>);

}

export default AvisoPrivavidad;