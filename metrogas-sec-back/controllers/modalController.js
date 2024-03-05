const axios = require('axios');
const jwt = require('jsonwebtoken');

const modifirows = async (req, res) => {
    const storedToken = req.headers.authorization;

    if (!storedToken) {
        return res.status(401).json({ success: false, message: 'No se proporcionó un token de autorización' });
    }

    const headers = {
        'Content-Type': 'application/json',
        Authorization: storedToken,
    };

    try {
        const requestData = req.body;
        console.log('el json enviado', requestData)
        
        const response = await axios.put('https://wlqat.sec.cl/wsInstrucciones/cumplimientos', requestData, { headers });

        if (response.status === 200) {
            const responseData = response.data;
            console.log('el respondce despues del 200', responseData)
            res.status(200).json({ success: true, responseData });
        } else {
            res.status(response.status).json({ success: false, message: 'Respuesta inesperada del servidor externo' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error en la solicitud al servidor externo', error: error.message });
    }
}

module.exports = {
    modifirows,
};
