const axios = require('axios');

const handleLogin = async (req, res) => {
    const { rut, p } = req.body;
    const rutNumber = parseInt(rut, 10);

    if (!isNaN(rutNumber) && p) {

    const querystring = require('querystring');
    const body = querystring.stringify({ rut: rutNumber, p: p });
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
        const response = await axios.post('https://wlqat.sec.cl/wsInstrucciones/login', body, { headers});
        console.log('el response del try',response.data)
        console.log('el response del try',response.headers)
        
        if (response.status == 200) {
            const token = response.headers['authorization'];

            if (token) {
                res.status(200).json({ success: true, token });

            } else {
                res.status(500).json({ success: false, message: 'No se encontró el token en la cabecera de la respuesta' });
            }
        } else {
            res.status(response.status).json({ success: false, message: 'Respuesta inesperada del servidor externo' });
        }
    } catch (error) {
        console.error(error);

        res.status(500).json({ success: false, message: 'Error en la solicitud al servidor externo', error: error.message });
    }

    } else {
        res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }
};

module.exports = {
    handleLogin
};
