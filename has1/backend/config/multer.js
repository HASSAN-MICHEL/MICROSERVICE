// import multer from 'multer';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads'); // dossier à la racine
//   },
//   filename: (req, file, cb) => {
//     const unique = Date.now() + '-' + file.originalname;
//     cb(null, unique);
//   },
// });

// export const upload = multer({ storage });


import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Créer le dossier uploads s'il n'existe pas
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Chemin absolu
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + file.originalname;
    cb(null, unique);
  },
});

export const upload = multer({ storage });