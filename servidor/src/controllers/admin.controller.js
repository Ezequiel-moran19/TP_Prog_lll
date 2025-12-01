import { Producto } from "../model/producto.model.js";
import { Admin } from "../model/admin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class adminController{

    static async login(req,res){
        res.render("login");
    }

    static async dashboard(req,res){
        res.render("dashboard");
    }

    static async altaProducto(req,res){
        res.render("altaProducto");
    }

    static async editarProducto(req,res){
        const producto = await Producto.findByPk(req.params.id);
        res.render("editarProducto", { producto });
    }
    static async ingresar(req, res){
        const { nombre, pass } = req.body;

        try {
            // 1) Busco el usuario admin en DB
            const admin = await Admin.findOne({ where: { nombre } })
            if (!admin) {
            return res.render('login', { error: "Credenciales incorrectas" })
            }
            // 2) Comparo contraseña ingresada con la hash guardado
            const contraseña = await bcrypt.compare( pass, admin.pass)
            if (!contraseña) {
            return res.render("login", { error: "Credenciales incorrectas" });
            }
            // 3) Crear JWT (aquí ocurre la "firma" digital)
            // jwt.sign(payload, claveSecreta, configuraciones)
            const token = jwt.sign(
            { id: admin.id, nombre: admin.nombre }, // datos visibles en el token
                process.env.JWT_SECRET, // ESTA ES LA CLAVE QUE FIRMA EL TOKEN
            { expiresIn: "10m" } // el token expira en 1 horas
            )
            // 4) Guardar la cookie httpOnly → No es accesible desde JS del navegador
            res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 10 * 60 * 1000 // 10 min
            });

            return res.redirect("/admin/dashboard");
            
        } catch (err) {
            console.error("Error en login:", err);
            res.render("login", { error: "Error al iniciar sesión" });
        }
    }

    static async salir(req,res){
        res.clearCookie("token");
        return res.redirect("/admin/login");
    }

    // esto es para postman 
    static async registrar(req,res){
        try {
            const { nombre, pass } = req.body;
            const hashed = await bcrypt.hash(pass, 10);
            const admin = await Admin.create({ nombre, pass: hashed });

            res.status(201).json({ msg: "Admin creado", admin });
        } catch (err) {
            console.log()
            res.status(500).json({ error: "Error al registrar admin" });
        }
    }
}