import React from "react";
import terminosyCondicionesPdf from "../assets/TerminosyCondiciones.pdf";

function Tyc() {
  return (
    <div className="pdf-container">
      <iframe
        title="Aviso de Privacidad"
        src={terminosyCondicionesPdf}
        width="100%"
        height="100%"
      />
    </div>
  );
}

export default Tyc;
