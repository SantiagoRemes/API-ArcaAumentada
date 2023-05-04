const { poolPromise } = require("../config/db.js");

module.exports = {
    getAllDesarrollador: async (req, res, next) => {
        try {
          const pool = await poolPromise;
          const result = await pool
            .request()
            .query("SELECT * FROM Desarrollador", function (err, resultset) {
              if (err) {
                console.log(err);
              } else {
                var Desarrolladores = resultset.recordset;
                return res.status(200).json(Desarrolladores);
              }
            });
        } catch (err) {
          return res
            .status(500)
            .json({ message: `Error al obtener los Desarrolladores. Err: ${err}` });
        }
    },
    getDesarrollador:
    async (req, res, next) => {
      try {
        const id = req.params.id;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`SELECT * FROM Desarrollador WHERE idDesarrollador = ${id}`, function (err, resultset) {
            if (err) {
              console.log(err);
            } else {
              var dato = resultset.recordset;
              return res.status(200).json(dato);
            }
          });
      } catch (err) {
        return res
          .status(500)
          .json({ message: `Error al obtener los Desarrolladores. Err: ${err}` });
      }
    },
    loginDesAdminChofer:
    async (req, res, next) => {
      try {
        const {usuario, contrasena} = req.body;
        let desarrollador = 0;
        let administrador = 0;
        let chofer = 0;
        let id = null;
        const pool = await poolPromise;
        const results = await Promise.all([
          pool.request().query(`Select * FROM Desarrollador WHERE usuario = '${usuario}' AND contrasena = '${contrasena}'`),
          pool.request().query(`Select * FROM Administrador WHERE usuario = '${usuario}' AND contrasena = '${contrasena}'`),
          pool.request().query(`Select * FROM Chofer WHERE usuario = '${usuario}' AND contrasena = '${contrasena}'`),
        ]);
        results.forEach(result => {
          if (result.recordset.length > 0) {
            if (result.recordset[0].hasOwnProperty('idDesarrollador')) {
              desarrollador = 1;
              id = result.recordset[0].idDesarrollador
            } else if (result.recordset[0].hasOwnProperty('idAdministrador')) {
              administrador = 1;
              id = result.recordset[0].idAdministrador
            } else if (result.recordset[0].hasOwnProperty('idChofer')) {
              chofer = 1;
              id = result.recordset[0].idChofer
            }
          }
        });
        const data = [{
          'Desarrollador': desarrollador,
          'Administrador': administrador,
          'Chofer': chofer,
          'id': id,
        }];
        return res.status(200).json(data);
      } catch (err) {
        return res.status(500).json({ message: `Error al hacer login. Err: ${err}` });
      }
    },
};