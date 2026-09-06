import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Resultado.css";

function Resultado() {

    const NAVEGAR = useNavigate();

    const [ESTADO, SET_ESTADO] = useState("Cargando...");
    const [MENSAJE, SET_MENSAJE] = useState("");

    useEffect(() => {

        const REQUEST_ID = sessionStorage.getItem("REQUEST_ID");

        if (!REQUEST_ID) {

            SET_ESTADO("ERROR");
            SET_MENSAJE("No se encontró el RequestId.");

            return;
        }

        async function CONSULTAR_PAGO() {

            try {

                const RESPUESTA = await fetch(
                    "http://localhost:3001/api/consultar-pago",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            requestId: REQUEST_ID
                        })
                    }
                );

                const DATOS = await RESPUESTA.json();

                console.log("Respuesta del pago:", DATOS);

                if (DATOS.status) {

                    SET_ESTADO(DATOS.status.status);
                    SET_MENSAJE(DATOS.status.message);

                } else {

                    SET_ESTADO("ERROR");
                    SET_MENSAJE(
                        "No fue posible obtener el estado del pago."
                    );

                }

            } catch (ERROR) {

                console.error(ERROR);

                SET_ESTADO("ERROR");
                SET_MENSAJE(
                    "No fue posible conectar con el backend."
                );
            }
        }

        CONSULTAR_PAGO();

    }, []);


    function VOLVER() {

        sessionStorage.removeItem("REQUEST_ID");

        NAVEGAR("/");
    }


    function OBTENER_TITULO() {

        if (ESTADO === "APPROVED") {
            return "¡Pago aprobado!";
        }

        if (ESTADO === "PENDING") {
            return "Pago pendiente";
        }

        if (ESTADO === "REJECTED") {
            return "Pago rechazado";
        }

        return ESTADO;
    }


    function OBTENER_ICONO() {

        if (ESTADO === "APPROVED") {
            return "✅";
        }

        if (ESTADO === "PENDING") {
            return "⏳";
        }

        if (ESTADO === "REJECTED") {
            return "❌";
        }

        return "⚠️";
    }


    return (

        <div className="PAGINA_RESULTADO">

            <div className="RESULTADO">

                <h1>
                    ✨ Tienda Chicas
                </h1>

                <p className="SUBTITULO">
                    Resultado del pago
                </p>


                <div className="ESTADO">

                    <div className="ICONO_ESTADO">
                        {OBTENER_ICONO()}
                    </div>

                    <h2>
                        {OBTENER_TITULO()}
                    </h2>

                    <p>
                        {MENSAJE}
                    </p>

                </div>


                <button onClick={VOLVER}>
                    Volver a la tienda
                </button>

            </div>

        </div>
    );
}

export default Resultado;