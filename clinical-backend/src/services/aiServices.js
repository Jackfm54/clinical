const { spawn } = require("child_process");

const inferRisk = async (healthData) => {
  try {
    const prompt = `Analyze: Heart Rate ${healthData.heartRate}, Blood Pressure ${healthData.bloodPressure}, Oxygen Level ${healthData.oxygenLevel}`;
    console.log("Prompt enviado al modelo:", prompt);

    const command = spawn("ollama", ["run", "monotykamary/medichat-llama3"]);
    command.stdin.write(prompt);
    command.stdin.end();

    let output = "";
    for await (const chunk of command.stdout) {
      output += chunk;
    }

    let errorOutput = "";
    for await (const chunk of command.stderr) {
      errorOutput += chunk;
    }

    if (errorOutput) {
      console.error("Error del modelo:", errorOutput);
      throw new Error("AI service unavailable");
    }

    console.log("Respuesta del modelo:", output);
    return output.trim();
  } catch (error) {
    console.error("Error ejecutando el modelo:", error.message);
    throw new Error("AI service unavailable");
  }
};

module.exports = { inferRisk };
