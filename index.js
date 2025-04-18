const dotenv = require('dotenv');
dotenv.config();

const app = require('./src/app');
const conncectDB = require('./src/config/db.config');




const port = process.env.PORT || 4001;

conncectDB().then(() => {
    app.listen(port, () => {
        console.log(`🚀 Server ready at http://localhost:${port}`);
    })
})