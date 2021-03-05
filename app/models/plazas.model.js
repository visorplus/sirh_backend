/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('plazas', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        id_categorias: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        consecutivo: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_catplanteles: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_catcentrostrabajo: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_catplantelescobro: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_catzonageografica: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        fecha_creacion: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        fecha_fin: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        id_catestatusplaza: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        statussicodes: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_puesto: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_sindicato: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        estatus: {
            type: DataTypes.STRING,
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        id_usuarios_r: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'plazas',
        schema: 'public',
        //timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
};