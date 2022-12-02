import app from "./app";
import config from './apiConfig';

app.listen(config.port, () => { //kuulab porti, mille annan apiConfig failis
    console.log("Server töötab");
});


