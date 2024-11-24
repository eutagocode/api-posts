import { v7 } from "uuid";

class Post {
    constructor(title, description, author) {
        this.id = v7();
        this.title = title;
        this.description = description;
        this.author = author;
    }
}

class PostsCRUD extends Post {
    posts = [];

    getPosts() {
        return this.posts;
    }

    createPost(title, description, author) {
        const post = new Post(title, description, author);

        this.posts.push(post);
    }

    updatePost(id, title, description, author) {
        const post = this.posts.filter((post) => post.id === id);

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
    }

    deletePost(id) {
        const postIndex = this.posts.findIndex((post) => post.id === id);

        this.posts.splice(postIndex, 1);
    }
}

export { PostsCRUD };
