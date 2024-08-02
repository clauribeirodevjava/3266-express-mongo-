import express from 'express';
import conectaNaDataBase from "./config/dbConnect.js"
import livro from './models/Livro.js';

const conexao = await conectaNaDataBase();
conexao.on("error", (erro)=> {
    console.error("erro de conexao",erro);
})
conexao.once("open", () => {
    console.log("conexão com o banco feita com sucesso")
})
const app = express();
app.use(express.json());


app.get("/",(req, resp)=>{
    resp.status(200, resp.send("Curso de Node.js"));
});
app.get("/livros",async (req,res)=>{
    const listaLivros = await livro.find({});
    res.status(200).json(listaLivros);
});


export default app;
