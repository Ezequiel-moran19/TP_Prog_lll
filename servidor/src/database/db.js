import { Sequelize } from "sequelize"

export const sequelize = new Sequelize("producto_test", "root", "", {
    host: "localhost",
    dialect: "mysql",
})