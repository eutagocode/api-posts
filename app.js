// Importação de bibliotecas
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
// Importação de arquivos
import router from "./routes/api.js";
// Variáveis globais
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3333;
// Middleware
app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use(express.static(path.join(__dirname, "public")));

try {
    // Inicialização do servidor
    app.listen(PORT, () => {
        console.log("Listening on port", PORT);
    });
} catch (error) {
    console.error(error);
}
