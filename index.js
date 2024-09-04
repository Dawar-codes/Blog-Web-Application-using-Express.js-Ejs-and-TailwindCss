import express from "express";
import methodOverride from 'method-override';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Array to store posts
let posts = [
    { title: "AI Innovations: The Future of Technology", body: "Explore the latest advancements in artificial intelligence and how they're shaping the future of technology. From machine learning breakthroughs to AI ethics, this post covers it all." },
    { title: "Top Web Development Trends for 2024", body: "Stay ahead of the curve with the latest trends in web development. This post highlights emerging technologies, frameworks, and best practices that will dominate the industry in 2024." },
    { title: "The Rise of Cloud Computing", body: "Discover how cloud computing is revolutionizing the tech industry. From scalable storage solutions to cloud-based applications, this post covers the key benefits and challenges of adopting cloud technologies." },
    { title: "Cybersecurity Essentials: Protecting Your Data", body: "Learn about the fundamental principles of cybersecurity and how to protect your personal and professional data. This post provides tips and best practices for safeguarding your information in a digital world." },
    { title: "Reviewing the Latest Tech Gadgets", body: "Get insights into the latest tech gadgets hitting the market. This post reviews the top devices, their features, and how they stand out in the crowded tech landscape." },
    { title: "Top Programming Languages to Learn in 2024", body: "Explore the programming languages that are gaining popularity in 2024. This post provides a detailed overview of the languages you should consider learning to stay competitive in the tech industry." }
];

// Route to render the home page
app.get("/", (req, res) => {
    res.render("index.ejs", { posts: posts }); // Pass the posts array to the index.ejs template
});

// Route to render the new post form
app.get("/newpost", (req, res) => {
    res.render("newpost.ejs");
});

// Route to handle form submission and create a new post
app.post("/newpost", (req, res) => {
    const title = req.body.name; // Get the title from the form data
    const body = req.body.text; // Get the body/content from the form data

    // Create a new post object
    const newPost = { title: title, body: body };

    // Add the new post to the posts array
    posts.push(newPost);

    // Redirect to the homepage after submitting the form
    res.redirect("/");
});


app.post("/delete/:index", (req, res) => {
    const index = req.params.index;
    posts.splice(index,1);
    res.redirect("/")
});

app.get("/edit/:index", (req, res) => {
    const index = req.params.index; 
    const post = posts[index];
    res.render("editpost.ejs", {post: post, index: index})
});

app.put("/edit/:index", (req, res) =>{
    const index = req.params.index; 
    posts[index].title= req.body.name;
    posts[index].body= req.body.text;
    res.redirect("/");
});

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})