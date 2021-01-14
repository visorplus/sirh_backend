const { authJwt } = require("../middleware");
const controller = require("../controllers/catestadocivil.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/catestadocivil/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/catestadocivil/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/catestadocivil/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
    app.post(
        "/api/catestadocivil/getCatalogoSegunSexo", [authJwt.verifyToken],
        controller.getCatalogoSegunSexo
    );

};