import { BrowserRouter, Routes, Route } from "react-router-dom";

import Tienda from "./pagina/Tienda";
import Carrito from "./pagina/Carrito";
import Resultado from "./pagina/Resultado";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Tienda />}
                />

                <Route
                    path="/carrito"
                    element={<Carrito />}
                />

                <Route
                    path="/resultado"
                    element={<Resultado />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;