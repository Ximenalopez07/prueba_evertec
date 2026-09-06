const EXPRESS = require("express");
const CORS = require("cors");
const AXIOS = require("axios");
require("dotenv").config();

const CREAR_AUTENTICACION = require("./config/placetopay");

const APP = EXPRESS();


APP.use(CORS());
APP.use(EXPRESS.json());


// RUTA PRINCIPAL

APP.get("/", (REQ, RES) => {

    RES.json({
        mensaje: "Backend WebCheckout funcionando"
    });

});


// CREAR PAGO

APP.post("/api/pago", async (REQ, RES) => {

    try {

        const TOTAL = REQ.body.total;

        const AUTENTICACION = CREAR_AUTENTICACION();

        const DATOS_PAGO = {

            auth: AUTENTICACION,

            payment: {

                reference: "PEDIDO-" + Date.now(),

                description: "Compra Tienda Chicas",

                amount: {

                    currency: "COP",

                    total: TOTAL

                }

            },

            returnUrl: "http://localhost:5175/resultado",

            ipAddress: REQ.ip,

            userAgent: REQ.headers["user-agent"]

        };


        const RESPUESTA = await AXIOS.post(

            `${process.env.PLACETOPAY_URL}/api/session`,

            DATOS_PAGO,

            {

                headers: {

                    "Content-Type": "application/json"

                }

            }

        );


        RES.json(RESPUESTA.data);


    } catch (ERROR) {

        console.error(
            ERROR.response?.data || ERROR.message
        );

        RES.status(500).json({

            mensaje: "Error al crear la sesión de pago",

            error: ERROR.response?.data || ERROR.message

        });

    }

});


// CONSULTAR ESTADO DEL PAGO

APP.post("/api/consultar-pago", async (REQ, RES) => {

    try {

        const REQUEST_ID = REQ.body.requestId;

        const AUTENTICACION = CREAR_AUTENTICACION();


        const RESPUESTA = await AXIOS.post(

            `${process.env.PLACETOPAY_URL}/api/session/${REQUEST_ID}`,

            {
                auth: AUTENTICACION
            },

            {

                headers: {

                    "Content-Type": "application/json"

                }

            }

        );


        RES.json(RESPUESTA.data);


    } catch (ERROR) {

        console.error(
            ERROR.response?.data || ERROR.message
        );

        RES.status(500).json({

            mensaje: "Error al consultar el pago",

            error: ERROR.response?.data || ERROR.message

        });

    }

});


// INICIAR SERVIDOR

const PORT = process.env.PORT || 3001;

APP.listen(PORT, () => {

    console.log(
        `Servidor funcionando en http://localhost:${PORT}`
    );

});