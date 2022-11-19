import app from "./app";
import config from './apiConfig';

app.listen(config.port, () => {
    console.log("Server töötab");
});


