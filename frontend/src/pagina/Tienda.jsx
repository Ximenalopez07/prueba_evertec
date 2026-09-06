import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Tienda.css";

const PRODUCTOS = [
    {
        ID: 1,
        NOMBRE: "Camiseta",
        PRECIO: 50000,
        IMAGEN: "https://www.gef.co/cdn/shop/files/leka-rosado-40602-748285_040602-1.jpg?v=1765980962&width=1000"
    },
    {
        ID: 2,
        NOMBRE: "Jean Ancho",
        PRECIO: 90000,
        IMAGEN: "https://i.pinimg.com/736x/75/e6/62/75e66237e83ae582f3cc73e20e99f8c4.jpg"
    },
    {
        ID: 3,
        NOMBRE: "Buzo",
        PRECIO: 100000,
        IMAGEN: "https://nikearprod.vtexassets.com/arquivos/ids/1118774-1000-1000?v=638634049228930000&width=1000&height=1000&aspect=true"
    },
    {
        ID: 4,
        NOMBRE: "Vestido",
        PRECIO: 120000,
        IMAGEN: "https://i.pinimg.com/originals/2e/15/13/2e1513106ea7ba91f095d059cd27cd92.jpg"
    },
    {
        ID: 5,
        NOMBRE: "Blusa",
        PRECIO: 65000,
        IMAGEN: "https://i.pinimg.com/originals/e5/47/2e/e5472ea67142022372d70f0b884b4df7.jpg"
    },
    {
        ID: 6,
        NOMBRE: "Falda",
        PRECIO: 80000,
        IMAGEN: "https://eslamoda.com/wp-content/uploads/sites/2/2024/11/falda_-larga-outfit-.jpg"
    }
];

function FORMATEAR_PRECIO(PRECIO) {
    return PRECIO.toLocaleString("es-CO");
}

function Tienda() {

    const [CARRITO, SET_CARRITO] = useState([]);

    const NAVEGAR = useNavigate();

    function AGREGAR_AL_CARRITO(PRODUCTO) {

        SET_CARRITO([
            ...CARRITO,
            PRODUCTO
        ]);
    }

    function IR_AL_CARRITO() {

        NAVEGAR("/carrito", {
            state: {
                CARRITO: CARRITO
            }
        });
    }

    return (
        <div className="TIENDA">

            <header className="ENCABEZADO">

                <div>
                    <h1>✨ Tienda Chicas</h1>
                    <p>Prueba técnica PlaceToPay</p>
                </div>

                <button
                    className="CARRITO_ICONO"
                    onClick={IR_AL_CARRITO}
                >
                    🛒
                    <span>{CARRITO.length}</span>
                </button>

            </header>

            <main>

                <h2>1. PRODUCTOS</h2>

                <section className="PRODUCTOS">

                    {PRODUCTOS.map((PRODUCTO) => (

                        <article
                            className="PRODUCTO"
                            key={PRODUCTO.ID}
                        >

                            <img
                                src={PRODUCTO.IMAGEN}
                                alt={PRODUCTO.NOMBRE}
                            />

                            <div className="INFORMACION">

                                <h3>{PRODUCTO.NOMBRE}</h3>

                                <p>
                                    ${FORMATEAR_PRECIO(PRODUCTO.PRECIO)} COP
                                </p>

                                <label>Talla</label>

                                <select defaultValue="M">
                                    <option>S</option>
                                    <option>M</option>
                                    <option>L</option>
                                    <option>XL</option>
                                </select>

                                <button
                                    onClick={() =>
                                        AGREGAR_AL_CARRITO(PRODUCTO)
                                    }
                                >
                                    + Agregar al carrito
                                </button>

                            </div>

                        </article>

                    ))}

                </section>

            </main>

        </div>
    );
}

export default Tienda;