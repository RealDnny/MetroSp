import multer from 'multer';
import { resolve } from 'path';
import fs from 'fs';

// Definindo o caminho para a pasta de uploads
const uploadDir = resolve("tmp", "uploads");

// Verifica se a pasta de uploads existe, se não, cria
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do multer para salvar arquivos no diretório
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

// Middleware para uploads
const upload = multer({ storage });

export default upload;
