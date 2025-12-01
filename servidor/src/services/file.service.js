import fs from "fs";
import path from "path";

export class FileService {
  static guardarImagen(file) {
    if (!file) return null;
    
    const destino = path.join("servidor/src/uploads", file.originalname);
    fs.renameSync(file.path, destino);
    return `/uploads/${file.originalname}`;
  }
}