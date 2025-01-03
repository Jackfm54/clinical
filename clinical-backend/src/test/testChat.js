const axios = require("axios");

(async () => {
  try {
    // Datos de prueba para el chat
    const healthData = {
      heartRate: 110,
      bloodPressure: "140/90",
      oxygenLevel: 95,
    };

    // Enviar solicitud al endpoint /chat
    const response = await axios.post("http://localhost:5001/api/chat", {
      healthData,
    });

    console.log("Chat Response:", response.data);
  } catch (error) {
    console.error("Error in Chat Request:", error.response?.data || error.message);
  }
})();
