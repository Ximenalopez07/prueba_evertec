const CRYPTO = require("crypto");

function CREAR_AUTENTICACION() {

    const LOGIN = process.env.PLACETOPAY_LOGIN;
    const SECRET_KEY = process.env.PLACETOPAY_SECRET_KEY;

    const SEED = new Date().toISOString();

    const NONCE = Math.random().toString(36).substring(2);

    const TRAN_KEY = CRYPTO
        .createHash("sha256")
        .update(NONCE + SEED + SECRET_KEY)
        .digest("base64");

    const NONCE_BASE64 = Buffer
        .from(NONCE)
        .toString("base64");

    return {
        login: LOGIN,
        tranKey: TRAN_KEY,
        nonce: NONCE_BASE64,
        seed: SEED
    };
}

module.exports = CREAR_AUTENTICACION;