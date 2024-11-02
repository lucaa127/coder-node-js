import * as url from 'url';


const config = {
    PORT: 8080,
    DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
    get UPLOAD_DIR() { return `${this.DIRNAME}/public/uploads` },
    MONGODB_URI:'mongodb+srv://coder:coder@cluster0.fwsqm1h.mongodb.net/coder'
};

export default config;