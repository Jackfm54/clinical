const { exec } = require("child_process");

/**
 * Ejecuta el modelo Ollama localmente y devuelve la respuesta.
 * @param {Object} options - Configuración del modelo.
 * @param {string} options.prompt - Texto del prompt a enviar al modelo.
 * @param {string} [options.model="monotykamary/medichat-llama3"] - Modelo a ejecutar.
 * @returns {Promise<string>} - Respuesta del modelo.
 */
const inferRisk = async ({ prompt, model = "ALIENTELLIGENCE/medicaldiagnostictools" }) => {
  return new Promise((resolve, reject) => {
    console.log("Executing model:", model);
    console.log("Prompt being sent:", prompt);

    // Construir el comando con echo y ollama
    const command = `echo "${prompt}" | ollama run ${model}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Exec error:", stderr || error.message);
        return reject(new Error("AI model execution failed."));
      }

      console.log("Model Response:", stdout.trim());
      resolve(stdout.trim());
    });
  });
};

module.exports = { inferRisk };
