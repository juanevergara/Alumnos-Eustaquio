module.exports = function(sequelize, dataTypes){
    let alias = "Alumno";
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        nombre: {
            type: dataTypes.STRING(100)
        },
        apellido: {
            type: dataTypes.STRING(100)
        },
        fecha_nacimiento: {
            type: dataTypes.DATE
        },
        legajo: {
            type: dataTypes.INTEGER
        }
    }
    let config = {
        tableName: "alumnos", 
        timestamps: false,
        underscored: true
    }

    let Alumno = sequelize.define(alias, cols, config);

    Alumno.associate = function(models){
        Alumno.hasMany(models.Nota, {
            as: "notas",
            foreignKey: "id_alumno"
        })
    }

    return Alumno;
}