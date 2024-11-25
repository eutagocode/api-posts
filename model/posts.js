// Importação de bibliotecas
import { v7 } from "uuid";

// Classe para criação dos posts
class Post {
    constructor(title, description, author) {
        this.id = v7();
        this.title = title;
        this.description = description;
        this.author = author;
    }
}

// Classe para criar os métodos das requisições
class PostsCRUD extends Post {
    posts = [];

    // Retorna os posts
    getPosts() {
        return this.posts;
    }

    createPost(title, description, author) {
        // Faz a instancia da classe Post e manda os argumentos da função como argumento da classe
        const post = new Post(title, description, author);

        // Manda o post para dentro da variável posts
        this.posts.push(post);
    }

    updatePost(id, title, description, author) {
        // Filtra o post selecionado se é o mesmo id que de um dos posts da variável posts
        const post = this.posts.filter((post) => post.id === id);

        // Mapeia os posts para manipular os posts
        post.map((post) => {
            // Faz a alteração dos dados do post
            post.title = title;
            post.description = description;
            post.author = author;

            // Faz a checagem se o cliente não preencher todos os inputs
            if (title === "" || description === "" || author === "") {
                title = post.title;
                description = post.description;
                author = post.author;
            }
        });
    }

    deletePost(id) {
        // Pega o index do post selecionado se é o mesmo id que de um dos posts da variável posts
        const postIndex = this.posts.findIndex((post) => post.id === id);

        // Exclui o post selecionado através do index
        this.posts.splice(postIndex, 1);
    }
}

// Exporta a classe
export { PostsCRUD };
