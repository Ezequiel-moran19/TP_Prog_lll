import jwt from "jsonwebtoken";

export function verificarAdmin(req, res, next) {

  // 1) Leer token desde la cookie
  const token = req.cookies?.token;
  if (!token) { // Si NO hay token → no está logueado
    return res.redirect("/admin/login");
  }

  try {
    // 2) Validar token usando la clave secreta
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = data; 
    // 3) Token válido → dejar pasar
    // renueva el token si hace cositas 
    const nuevoToken = jwt.sign(
      { id: data.id, nombre: data.nombre }, 
      process.env.JWT_SECRET, 
      { expiresIn: "10m" }  
    );

    res.cookie("token", nuevoToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 10 * 60 * 1000
    });
    next();

  } catch (err) {
    // Token vencido o manipulado
    return res.redirect("/admin/login");
  }
}
