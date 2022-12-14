const mongoose = require('mongoose')
const users = require('./routes/users')
const auth = require('./routes/auth')
const signUp = require('./routes/signup')
const signIn = require('./routes/signin')
const home = require('./routes/home')
const cookieParser = require('cookie-parser')
const signOut = require('./routes/signout')

const express = require('express')
const app = express();
const port = process.env.PORT || 9000;

// mongoose.connect('mongodb://0.0.0.0/Authentication_System')
mongoose.connect('mongodb+srv://fazilshafi:12345678jkl@cluster0.tkeri0b.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('connected to mongoDB...'))
    .catch(err => console.error('could not connect to mongoDB...', err))
app.use(express.json());

app.use(cookieParser())
app.use(express.urlencoded({extended:false}));


app.use('/signup', signUp)
app.use('/signin', signIn)
app.use('/signout', signOut)
app.use('/home', home)
app.use('/api/users', users)
app.use('/api/auth', auth)



app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, () => {
    console.log(`Listening on port no ${port}`)
})