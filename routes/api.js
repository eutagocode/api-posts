import express from "express";
import { PostsCRUD } from "../model/posts.js";
const posts = new PostsCRUD();
const router = express.Router();

router.get("/posts", (req, res) => {
    try {
        res.json(JSON.stringify(posts.getPosts()));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno no servidor." });
    }
});

router.post("/new", (req, res) => {
    try {
        const { title, description, author } = req.body;

        if (title === "" || description === "" || author === "") {
            return res.status(400).json({
                message: "Por favor, preencha todos os campos obrigatórios.",
            });
        }

        posts.createPost(title, description, author);

        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno no servidor." });
    }
});

router.put("/update/:id", (req, res) => {
    try {
        const postId = req.params.id;
        const { title, description, author } = req.body;

        posts.updatePost(postId, title, description, author);

        res.send("Post atualizado com sucesso!");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno no servidor." });
    }
});

router.delete("/delete/:id", (req, res) => {
    try {
        const postId = req.params.id;

        posts.deletePost(postId);

        res.send("Post apagado com sucesso!");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno no servidor." });
    }
});

export default router;
