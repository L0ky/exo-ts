import { posts, users, comments } from './data';

//Créer une Interface Post correspondant à la structure des objects du fichier posts.ts
interface IPost {
    userId: number, 
    id    : number,
    title : string,
    body  : string
}

//Créer une Interface Comment correspondant à la structure des objects du fichier comments.ts
interface IComment {
    postId: number,
    id    : number,
    name  : string,
    email : string,
    body  : string
}

// Créer une Interface User correspondant à la structure des objects du fichier users.ts

interface IUser {
    id      : number,
    name    : string,
    username: string,
    email   : string,
    address : Adress,
    phone   : string,
    website : string,
    company : Company

}

// Créer une Type Company correspondant à la structure de la propriété company du fichier users.ts
type Company = {
    name       : string,
    catchPhrase: string
    bs         : string
}

// Créer une type Address correspondant à la structure de la propriété address du fichier users.ts
type Adress = {
    street : string,
    suite  : string,
    city   : string,
    zipcode: string,
    geo    : Geo
}

// Créer une type Geo correspondant à la structure de la propriété geo du fichier users.ts
type Geo = {
    lat: string,
    lng: string
}

// Créer une fonction getUsers qui retourne un tableau d'objets User
function getUsers(): IUser[] {
    return users;
}

// Créer une fonction getPostOfAuthor qui retourne un tableau de Post
function getPostOfAuthor(): IPost[] {
    return posts;
}

// Créer une fonction qui permet de valider les propriétés d'un objet Post
function validatePost(post: any): post is IPost {
    return (
      typeof post.userId === "number" &&
      typeof post.id === "number" &&
      typeof post.title === "string" &&
      typeof post.body === "string"
    );
}
  
// étendre l'interface Post et ajoute une propriété comments de type Comment[]
interface IPostComment extends IPost {
    comments: IComment[];
    }

// Créer une fonction populatePostsWithComments pour ajouter la propriété comments à un objet Post
function populatePostsWithComments(posts: IPost[], comments: IComment[]): IPostComment[] {
    return posts.map(posts => ({
      ...posts,
      comments: comments.filter(comment => comment.postId === posts.id)
    }));
}
  

// Installer et importer axios
import axios from "axios"

// Créer une class ApiService qui a une propriété url et les methodes suivantes:
class ApiService {
    url: string
    // getAllpost qui retourne un tableau de post et qui utilise la propiété url
    async getAllPost() {
        return await axios.get(this.url)
    }

    // createPost qui utilise axios, la fonction de validation de post et la propiété url, prend en argument un post retourne une promesse d'un post
    async createPost(post: IPost) {
        return await axios.post(this.url, post)
    }

    // updatePost qui utilise axios, la fonction de validation de post et la propiété url, prend en argument un id, un post partiel retourne une promesse d'un post
    async updatePost(id: number, post: IPost) {
        return await axios.put(this.url + id, post)
    }

    // deletePost qui utilise axios et la propiété url, qui prend en argument un id et retourne une promesse d'une string
    async deletePost(id: number) {
        return await axios.delete(this.url + id)
    }
}


