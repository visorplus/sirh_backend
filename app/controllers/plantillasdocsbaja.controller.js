const db = require("../models");
const { Op } = require("sequelize");
const globales = require("../config/global.config");
const mensajesValidacion = require("../config/validate.config");
const Plantillasdocsnombramiento = db.plantillasdocsnombramiento;
const Categoriasdetalle = db.categoriasdetalle;
var moment = require('moment');
const { QueryTypes } = require('sequelize');
let Validator = require('fastest-validator');

/* create an instance of the validator */
let dataValidator = new Validator({
    useNewCustomCheckerFunction: true, // using new version
    messages: mensajesValidacion
});


exports.getAdmin = async(req, res) => {
    let datos = "",
        query = "",
        params = req.body.dataTablesParameters;

    if (req.body.solocabeceras == 1) {
        params = req.body;

        query = "SELECT * FROM s_plantillasdocsbaja_mgr('&modo=10&id_usuario=:id_usuario')"; //el modo no existe, solo es para obtener un registro

        datos = await db.sequelize.query(query, {
            replacements: {
                id_usuario: req.userId,
            },
            plain: false,
            raw: true,
            type: QueryTypes.SELECT
        });
    } else {

        query = "SELECT * FROM s_plantillasdocsbaja_mgr('" +
            "&modo=:modo&id_usuario=:id_usuario" +
            "&inicio=:start&largo=:length" +
            "&ordencampo=ID" +
            "&ordensentido=ASC" +
            "&fkey=" + params.opcionesAdicionales.fkey +
            "&fkeyvalue=" + params.opcionesAdicionales.fkeyvalue.join(",") + "')";

        datos = await db.sequelize.query(query, {
            // A function (or false) for logging your queries
            // Will get called for every SQL query that gets sent
            // to the server.
            logging: console.log,

            replacements: {
                id_usuario: req.userId,
                modo: params.opcionesAdicionales.modo,

                start: (typeof params.start !== typeof undefined ? params.start : 0),
                length: (typeof params.start !== typeof undefined ? params.length : 1),
                /*scampo: (typeof params.start !== typeof undefined ? parseInt(params.opcionesAdicionales.datosBusqueda.campo) : 0),
                soperador: (typeof params.start !== typeof undefined ? parseInt(params.opcionesAdicionales.datosBusqueda.operador) : 0),
                sdato: (typeof params.start !== typeof undefined ? params.opcionesAdicionales.datosBusqueda.valor.toString() : 0),*/
            },
            // If plain is true, then sequelize will only return the first
            // record of the result set. In case of false it will return all records.
            plain: false,

            // Set this to true if you don't have a model definition for your query.
            raw: true,
            type: QueryTypes.SELECT
        });
    }

    var columnNames = (datos.length > 0 ? Object.keys(datos[0]).map(function(key) {
        return key;
    }) : []);
    var quitarKeys = false;

    for (var i = 0; i < columnNames.length; i++) {
        if (columnNames[i] == "total_count") quitarKeys = true;
        if (quitarKeys)
            columnNames.splice(i);
    }

    respuesta = {
        draw: params.opcionesAdicionales.raw,
        recordsTotal: (datos.length > 0 ? parseInt(datos[0].total_count) : 0),
        recordsFiltered: (datos.length > 0 ? parseInt(datos[0].total_count) : 0),
        data: datos,
        columnNames: columnNames
    }

    res.status(200).send(respuesta);
    //return res.status(200).json(data);
    // res.status(500).send({ message: err.message });
}


exports.getRecord = async(req, res) => {

    Plantillasdocsnombramiento.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(plantillasdocsbaja => {
            if (!plantillasdocsbaja) {
                return res.status(404).send({ message: "Plantillasdocsbaja Not found." });
            }

            res.status(200).send(plantillasdocsbaja);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}


exports.setRecord = async(req, res) => {

    Object.keys(req.body.dataPack).forEach(function(key) {
        if (key.indexOf("id_", 0) >= 0) {
            if (req.body.dataPack[key] != '')
                req.body.dataPack[key] = parseInt(req.body.dataPack[key]);
            if (isNaN(req.body.dataPack[key]))
                req.body.dataPack[key] = 0;
        }
    });
    req.body.dataPack["id_catquincena_ini"] = req.body.dataPack["id_catquincena_fin"];


    /* customer validator shema */
    const dataVSchema = {
        /*first_name: { type: "string", min: 1, max: 50, pattern: namePattern },*/
        id: { type: "number" },
        id_plantillaspersonal: { type: "number" },
        fechaexpedicion: {
            type: "string",
            custom(value, errors) {
                let dateIni = new Date(value)
                let dateFin = new Date()

                if (dateIni > dateFin)
                    errors.push({ type: "dateMax", field: "fechaexpedicion", expected: dateFin.toISOString().split('T')[0] })

                if (!moment(value).isValid() || !moment(value).isBefore(new Date()) || !moment(value).isAfter('1900-01-01'))
                    errors.push({ type: "date" })
                return value;
            },
        },
        id_catquincena_fin: {
            type: "number",
            custom(value, errors) {
                if (value <= 0) errors.push({ type: "selection" })
                    ///////////////
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        id_catbajamotivo: {
            type: "number",
            custom(value, errors) {
                if (value <= 0) errors.push({ type: "selection" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        id_categorias: {
            type: "number",
            custom(value, errors) {
                //if (datosCatestatusplaza.length > 0 && datosCatestatusplaza[0].esnombramiento == 1 && value <= 0) errors.push({ type: "selection" })
                if (value <= 0) errors.push({ type: "selection" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        id_plazas: {
            type: "number",
            custom(value, errors) {
                //if (datosCatestatusplaza.length > 0 && datosCatestatusplaza[0].esnombramiento == 1 && value <= 0) errors.push({ type: "selection" })
                if (value <= 0) errors.push({ type: "selection" })
                return value; // Sanitize: remove all special chars except number
            }
        },
    };

    var vres = true;
    if (req.body.actionForm.toUpperCase() == "NUEVO" ||
        req.body.actionForm.toUpperCase() == "EDITAR") {
        vres = await dataValidator.validate(req.body.dataPack, dataVSchema);
    }

    /* validation failed */
    if (!(vres === true)) {
        let errors = {},
            item;

        for (const index in vres) {
            item = vres[index];

            errors[item.field] = item.message;
        }

        res.status(200).send({
            error: true,
            message: errors
        });
        return;
        /*throw {
            name: "ValidationError",
            message: errors
        };*/
    }

    //buscar si existe el registro
    Plantillasdocsnombramiento.findOne({
            where: {
                [Op.and]: [{ id: req.body.dataPack.id }, {
                    id: {
                        [Op.gt]: 0
                    }
                }],
            }
        })
        .then(plantillasdocsnombramiento => {
            if (!plantillasdocsnombramiento) {
                delete req.body.dataPack.id;
                delete req.body.dataPack.created_at;
                delete req.body.dataPack.updated_at;
                req.body.dataPack.id_usuarios_r = req.userId;
                req.body.dataPack.state = globales.GetStatusSegunAccion(req.body.actionForm);

                Plantillasdocsnombramiento.create(
                    req.body.dataPack
                ).then((self) => {
                    //Actualizar la plaza
                    query = "SELECT fn_set_plazas_estatus(:id_plantillasdocsnombramiento_afectador,:id_plantillaspersonal)"; //el modo no existe, solo es para obtener un registro

                    datos = db.sequelize.query(query, {
                        plain: false,
                        replacements: {
                            id_plantillasdocsnombramiento_afectador: self.id,
                            id_plantillaspersonal: req.body.dataPack.id_plantillaspersonal,
                        },
                        raw: true,
                        type: QueryTypes.SELECT
                    });

                    // here self is your instance, but updated
                    res.status(200).send({ message: "success", id: self.id });
                }).catch(err => {
                    res.status(200).send({ error: true, message: [err.errors[0].message] });
                });
            } else {
                delete req.body.dataPack.created_at;
                delete req.body.dataPack.updated_at;
                req.body.dataPack.id_usuarios_r = req.userId;
                req.body.dataPack.state = globales.GetStatusSegunAccion(req.body.actionForm);

                plantillasdocsnombramiento.update(req.body.dataPack).then((self) => {
                    //Actualizar la plaza
                    query = "SELECT fn_set_plazas_estatus(:id_plantillasdocsnombramiento_afectador,:id_plantillaspersonal)"; //el modo no existe, solo es para obtener un registro

                    datos = db.sequelize.query(query, {
                        plain: false,
                        replacements: {
                            id_plantillasdocsnombramiento_afectador: self.id,
                            id_plantillaspersonal: req.body.dataPack.id_plantillaspersonal,
                        },
                        raw: true,
                        type: QueryTypes.SELECT
                    });

                    // here self is your instance, but updated
                    res.status(200).send({ message: "success", id: self.id });
                });
            }


        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}