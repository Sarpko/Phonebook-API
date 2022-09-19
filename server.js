const express = require('express');
const cors = require('cors');

const app = express();

const corOptnios = {
    origin: 'https://localhost:8081'
};


//middleware

app.use(cors(corOptnios));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers

const UserRouter = require('./routes/userRoutes.js')
const PersonRouter = require('./routes/personRoutes.js')
app.use('/api/v1/phonebook', UserRouter)
app.use('/api/v1/phonebook', PersonRouter)

//testin api

app.get('/', (req, res) => {
    res.json({ message: 'hello from mobilist phone book api' })
})

//port

const PORT = process.env.PORT || 8080

//server

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

