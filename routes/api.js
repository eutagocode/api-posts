// Importação de bibliotecas
import express from "express";
// Importação de arquivos
import { PostsCRUD } from "../model/posts.js";
// Variáveis globais
const posts = new PostsCRUD();
const router = express.Router();

// Método GET
router.get("/posts", (req, res) => {
    try {
        // Mandando os posts como respostas
        res.json(JSON.stringify(posts.getPosts()));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno no servidor." });
    }
});

// Método POST
router.post("/new", (req, res) => {
    try {
        // Pegando os dados do corpo da requisição
        const { title, description, author } = req.body;

        // Fazendo a prevenção de um possível erro, caso o cliente não preencha um dos campos
        if (title === "" || description === "" || author === "") {
            return res.status(400).json({
                message: "Por favor, preencha todos os campos obrigatórios.",
            });
        }

        // Atribuindo os dados ao argumento da função
        posts.createPost(title, description, author);

        // Mandando uma resposta final
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno no servidor." });
    }
});

// Método PUT
router.put("/update/:id", (req, res) => {
    try {
        // Pegando o id do post através do parâmetro
        const postId = req.params.id;
        // Pegando os dados do corpo da requisição
        const { title, description, author } = req.body;

        // Atribuindo os dados ao argumento da função
        posts.updatePost(postId, title, description, author);

        // Mandando uma resposta final
        res.send("Post atualizado com sucesso!");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno no servidor." });
    }
});

// Método DELETE
router.delete("/delete/:id", (req, res) => {
    try {
        // Pegando o id do post através do parâmetro
        const postId = req.params.id;

        // Atribuindo o id ao argumento da função
        posts.deletePost(postId);

        // Mandando uma resposta final
        res.send("Post apagado com sucesso!");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno no servidor." });
    }
});

// Exportação padrão do router
export default router;
