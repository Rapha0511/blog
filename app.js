//jshint esversion:6

const express = require("express"); // inclue express
const bodyParser = require("body-parser"); // inclue body parser
const ejs = require("ejs"); //inclue ejs
// Load the full build.
var _ = require('lodash'); // inclue lodash


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const posts = []; // on cree un tableau qui va contenir les articles que l'on va creer
const app = express(); // inclue express

app.set('view engine', 'ejs'); // inclue ejs

app.use(bodyParser.urlencoded({extended: true})); // urlencoded pour recuperer les information saisie
app.use(express.static("public")); // repertoire contenant les fichier static

app.get("/",(req,res)=>{  // requette GET sur la page d'accueil

  res.render("home",{homeStartingContent: homeStartingContent,posts:posts}); // renvoi la home.ejs avec un objet dans lequelle on passe une pair key => value que l'on va appeler dans le home.js
});


app.get("/about",(req,res)=>{ // requette GET sur la page about

  res.render("about",{aboutContent: aboutContent});
});


app.get("/contact",(req,res)=>{

  res.render("contact",{contactContent: contactContent});
});

app.get("/compose",(req,res)=>{

  res.render("compose");
});

app.get('/posts/:postName',(req,res)=>{ // requete sur /post avec un parametre (:postName),
  let requestedTitle = req.params.postName; // represente le paramettre (si je tape localhost/3000/posts/bonjour, la valeur de requestedTitle est egale a "bonjour")
  for (let i = 0; i < posts.length; i++){ // on parcours le tableau qui contiens  les titre et le contenue
    if(_.lowerCase(requestedTitle) === _.lowerCase(posts[i].title)){ // si le paramettre est egale au titre 
      res.render("post.ejs",({title:posts[i].title,content:posts[i].content})); // alors on affiche le template post.ejs (avec un objet contenant le titre et le contenu de la page cibler)
    }
  }
})

app.post("/compose",(req,res)=>{

  let title = req.body.postTitle; // on recupere le titre tapé par l'utilisateur 
  let content = req.body.postContent; // on recupere le contenu tapé par l'utilisateur
  const post = { // on met le titre et le contenu sous forme d'objet
    title: title,
    content: content
  }
  posts.push(post); // on rajoute l'objet au tableau posts
  res.redirect("/"); // et on redirige sur la page d'accueil

})













app.listen(3000, function() {
  console.log("Server started on port 3000");
});
