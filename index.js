const express = require('express');
const cors = require('cors');

const postRoutes = require('./routes/posts');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/posts', postRoutes);

app.listen(4000, () => {
    console.log("Server is running at port 4000");
});