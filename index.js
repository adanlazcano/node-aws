const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {

    res.send('welcome world');
})

app.listen(app.get('port'), _ => {
    try {
        console.log(`Server running on port ${app.get('port')}`);
    } catch (error) {
        console.log(error.message);
    }
});