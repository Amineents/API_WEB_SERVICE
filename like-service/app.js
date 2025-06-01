require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const likeRoutes = require('./routes/likeRoutes');

const app = express();

app.use(express.json());
app.use('/api/likes', likeRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected to like-service');
        app.listen(process.env.PORT, () => {
            console.log(`Like service running on port ${process.env.PORT}`);
        });
    })
    .catch(err => console.error('MongoDB connection error:', err));
