const axios = require('axios');

const replicateToken = async (req, res) => {
    const storedToken = req.headers.authorization;

    if (!storedToken) {
        return res.status(401).json({ success: false, message: 'No se proporcionó un token de autorización' });
    }

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: storedToken,
    };

    try {
        const response = await axios.post('https://wlqat.sec.cl/wsInstrucciones/instrucciones', {}, { headers });

        if (response.status === 200) {
        const responseData = response.data;

        if (responseData && responseData.length > 0) {
            responseData = responseData.slice(0, 5000);
        }

        res.status(200).json({ success: true, responseData });
        } else {
        res.status(response.status).json({ success: false, message: 'Respuesta inesperada del servidor externo' });
        }
    } catch (error) {
        console.error(error);

        res.status(500).json({ success: false, message: 'Error en la solicitud al servidor externo', error: error.message });
    }
};

module.exports = {
    replicateToken,
};
