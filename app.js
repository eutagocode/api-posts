import express from "express";
import { v7 } from "uuid";
const app = express();
const PORT = 3333;

app.use(express.json());

class Post {
    constructor(title, description, author) {
        this.id = v7();
        this.title = title;
        this.description = description;
        this.author = author;
    }
}

const posts = [];

app.get("/posts", (req, res) => {
    try {
        res.json(JSON.stringify(posts));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno no servidor." });
    }
});

app.post("/new", (req, res) => {
    try {
        const { title, description, author } = req.body;

        if (title === "" || description === "" || author === "") {
            return res.status(400).json({
                message: "Por favor, preencha todos os campos obrigatórios.",
            });
        }

        const post = new Post(title, description, author);

        posts.push(post);

        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno no servidor." });
    }
});

app.put("/update/:id", (req, res) => {
    try {
        const postId = req.params.id;
        const { title, description, author } = req.body;

        const post = posts.filter((post) => post.id === postId);

        if (!post) {
            return res.status(404).json({
                message: "Este post não pode ser encontrado.",
            });
        }

        post.map((post) => {
            if (title === "" || description === "" || author === "") {
                title = post.title;
                description = post.description;
                author = post.author;
            }

            post.title = title;
            post.description = description;
            post.author = author;
        });

        res.send("Post atualizado com sucesso!");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno no servidor." });
    }
});

app.delete("/delete/:id", (req, res) => {
    try {
        const postId = req.params.id;

        const postIndex = posts.findIndex((post) => post.id === postId);

        if (postIndex < 0 || postIndex === "") {
            return res.status(404).json({
                message: "Este post não pode ser encontrado.",
            });
        }

        posts.splice(postIndex, 1);

        res.send("Post apagado com sucesso!");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno no servidor." });
    }
});

try {
    app.listen(PORT, () => {
        console.log("Listening on port", PORT);
    });
} catch (error) {
    console.error(error);
}
