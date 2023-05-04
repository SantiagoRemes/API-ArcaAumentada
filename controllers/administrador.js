const { poolPromise } = require("../config/db.js");

module.exports = {
    getAllAdministrador: async (req, res, next) => {
        try {
          const pool = await poolPromise;
          const result = await pool
            .request()
            .query("SELECT * FROM Administrador", function (err, resultset) {
              if (err) {
                console.log(err);
              } else {
                var Administradores = resultset.recordset;
                return res.status(200).json(Administradores);
              }
            });
        } catch (err) {
          return res
            .status(500)
            .json({ message: `Error al obtener los Administradores. Err: ${err}` });
        }
    },
    getAdministrador:
    async (req, res, next) => {
      try {
        const id = req.params.id;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`SELECT * FROM Administrador WHERE idAdministrador = ${id}`, function (err, resultset) {
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
          .json({ message: `Error al obtener los Administradores. Err: ${err}` });
      }
    },
};