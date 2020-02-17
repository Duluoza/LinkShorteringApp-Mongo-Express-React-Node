const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/link', require('./routes/link'));
app.use('/t/', require('./routes/redirect'));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', "build")));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', "build", 'index.html'))
    })
}

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        app.listen(PORT, err => {
            err ? console.log(err) : console.log(`Server started on port ${PORT}`);
        });

    } catch (e) {
        console.log('Server error', e.message);
        // process.exit(1) for exit node.js process
        process.exit(1);
    }
};

const db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

start();