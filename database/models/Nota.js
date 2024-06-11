module.exports = function(sequelize, dataTypes){
    let alias = "Nota";
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        asignatura: {
            type: dataTypes.STRING(100)
        },
        examen: {
            type: dataTypes.STRING(15)
        },
        id_alumno: {
            type: dataTypes.INTEGER
        },
        nota:{
            type: dataTypes.INTEGER
        }
    }
    let config = {
        tableName: "notas", 
        timestamps: false,
        underscored: true
    }

    let Nota = sequelize.define(alias, cols, config);


    Nota.associate = function(models){
        Nota.belongsTo(models.Alumno, {

            as: "notas",
            foreignKey: "id_alumno"
        })
    }

    return Nota;
}