import express from 'express';
import conectaNaDataBase from "./config/dbConnect.js"

const conexao = await conectaNaDataBase();
conexao.on("error", (erro)=> {
    console.error("erro de conexao",erro);
})
conexao.once("open", () => {
    console.log("conexão com o banco feita com sucesso")
})
const app = express();
app.use(express.json());
const livros =[ 
{
    id : 1,
    titulo : "O Senhor dos Anéis"
},
{
    id : 2,
    titulo : "O Hobbit"
}
];

function buscaLivro(id) {
    return livros.findIndex(livro => {
       return livro.id === Number(id);
    });
}
app.get("/",(req, resp)=>{
    resp.status(200, resp.send("Curso de Node.js"));
});
app.get("/livros",(req,res)=>{
    res.status(200).json(livros);
});
app.post("/livros",(req,resp)=>{
    livros.push(req.body);
    resp.status(201).send("livro cadastrado com sucesso!")
});
app.get("/livros/:id",(req,resp)=>{
    const index = buscaLivro(req.params.id);
    resp.status(200).json(livros[index]);
})
app.put("/livros/:id",(req,resp)=>{
    const index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    resp.status(200).send(livros);
});

app.delete("/livros/:id",(req,resp)=>{
    const index = buscaLivro(req.params.id);
    livros.splice(index,1);
    resp.status(200).send("Livro removido com sucesso")
});

export default app;
