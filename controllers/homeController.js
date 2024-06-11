const express = require('express');
const db = require("../database/models");
const { where } = require('sequelize');


const homeController = {
    show: function(req,res){
        db.Alumno.findAll()
            .then(function(data){
                res.render('index', {data : data})
            })
            .catch(function(error){
                console.log(error)
            }) 
    },
    agregar: function(req,res){
        res.render("agregar")
    },

    subir:function(req,res){
        let alum = req.body;
        let alumno = {
            nombre: alum.nombre,
            apellido: alum.apellido,
            fecha_nacimiento: alum.fechaNacimiento,
            legajo: alum.legajo
        }
        db.Alumno.create(alumno)
            .then(function(data){
                res.redirect('/')
            })
            .catch(function(error){
                console.log(error)
            })
    },
    detalle: function(req,res){
        db.Alumno.findByPk(req.params.id,{
            include: [
                {association: "notas"}
            ]
        })
            .then(function(data){
                let suma = 0
                for (let i = 0; i < data.notas.length; i++) {
                    suma += data.notas[i].nota;       
                }
                let promedio = suma/data.notas.length
                res.render('detalle', {alumno: data, promedio: promedio})
            })
            .catch(function(error){
                console.log(error)
            })
    },
    agregarNota: function(req, res){
        res.render('agregarNota')
    },
    subirNota: function(req,res){
        let info = req.body

        db.Alumno.findOne({
            where: [{legajo: info.legajo}]
        })
            .then(function(data){
                if(data != null){
                let not = {
                    asignatura: info.asignatura,
                    examen: info.examen,
                    id_alumno: data.id,
                    nota: info.nota
                }
                db.Nota.create(not)
                    .then(function(dato){
                        res.redirect("/")
                    })
                    .catch(function(error){
                        console.log(error)
                    })
                }else{
                    res.send("ese legajo no es valido, ingrese uno correspondiente a un alumno")
                }
            })
        
            .catch(function(error){
                console.log(error)
            })

    }
}

module.exports = homeController