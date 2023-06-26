import express from 'express';
import cors from 'cors';



const app = express();
app.use(cors());
app.use(express.json())


const listaUsuario = []
const tweets = []

/// logando 
app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;
  
    const novoUsuario = { username, avatar };
    listaUsuario.push(novoUsuario);
  
    res.send("OK");
  })


 /// postando tweet 
app.post("/tweets", (req, res)=>{

    
    
    const {username, tweet} = req.body
    const novoTweet = {username, tweet}
    
    const usuarioCadastrado = listaUsuario.find((usuario) => usuario.username === username)
    if(!usuarioCadastrado) {
        res.status(401).send("UNAUTHORIZED");
        return;
    }
    
    tweets.push(novoTweet)
    res.send("OK")

})



//// recebendo tweets
app.get("/tweets", (req, res)=>{

    const respota = []

    for(let i = 0; i < tweets.length; i++){
      let avatarUser =  listaUsuario.find((usuario) => usuario.username ===  tweets[i].username)

      const tweetsResposta = {username: avatarUser.username, avatar: avatarUser.avatar, tweet: tweets[i].tweet }
      respota.push(tweetsResposta)
    }


    res.send(respota)

})



const PORT = 5000
app.listen(PORT, () => console.log(`Running server on port ${PORT}`))

