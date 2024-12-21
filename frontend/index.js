import { AppRegistry } from "react-native";
import App from "./App"; // Importation du composant principal
import { name as appName } from "./app.json"; // Récupération du nom de l'application

// Enregistrement du composant principal pour l'application
AppRegistry.registerComponent(appName, () => App);
