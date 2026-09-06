import { useLocation, useNavigate } from "react-router-dom";
import "./Carrito.css";

function FORMATEAR_PRECIO(PRECIO) {
    return PRECIO.toLocaleString("es-CO");
}

function Carrito() {

    const UBICACION = useLocation();
    const NAVEGAR = useNavigate();

    const CARRITO = UBICACION.state?.CARRITO || [];

    const TOTAL = CARRITO.reduce(
        (SUMA, PRODUCTO) => SUMA + PRODUCTO.PRECIO,
        0
    );

    function VOLVER() {

        NAVEGAR("/");
    }

    async function PAGAR() {

        try {

            const RESPUESTA = await fetch(
                "http://localhost:3001/api/pago",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        total: TOTAL
                    })
                }
            );

            const DATOS = await RESPUESTA.json();

            console.log(DATOS);

            if (DATOS.processUrl && DATOS.requestId) {

                // Guardamos el RequestId
                sessionStorage.setItem(
                    "REQUEST_ID",
                    DATOS.requestId
                );

                // Vamos a PlaceToPay
                window.location.href = DATOS.processUrl;

            } else {

                alert("No se pudo crear el pago");

            }

        } catch (ERROR) {

            console.error(ERROR);

            alert("Error al conectar con el backend");

        }
    }

    return (

        <div className="PAGINA_CARRITO">

            <header className="ENCABEZADO_CARRITO">

                <button
                    className="BOTON_VOLVER"
                    onClick={VOLVER}
                >
                    ← Volver
                </button>

                <h1>🛒 Carrito</h1>

            </header>


            <main className="CONTENIDO_CARRITO">

                <h2>2. CARRITO</h2>


                {CARRITO.length === 0 ? (

                    <div className="VACIO">

                        <p>
                            El carrito está vacío.
                        </p>

                    </div>

                ) : (

                    <div className="CARRITO">

                        {CARRITO.map((PRODUCTO, INDEX) => (

                            <div
                                className="ITEM_CARRITO"
                                key={INDEX}
                            >

                                <img
                                    src={PRODUCTO.IMAGEN}
                                    alt={PRODUCTO.NOMBRE}
                                />

                                <div className="DATOS_PRODUCTO">

                                    <h3>
                                        {PRODUCTO.NOMBRE}
                                    </h3>

                                    <p>
                                        ${FORMATEAR_PRECIO(PRODUCTO.PRECIO)} COP
                                    </p>

                                </div>

                            </div>

                        ))}


                        <div className="TOTAL">

                            <strong>
                                Total
                            </strong>

                            <strong>
                                ${FORMATEAR_PRECIO(TOTAL)} COP
                            </strong>

                        </div>


                        <button
                            className="BOTON_PAGAR"
                            onClick={PAGAR}
                        >
                            Pagar
                        </button>

                    </div>

                )}

            </main>

        </div>
    );
}

export default Carrito;