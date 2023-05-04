const { poolPromise } = require("../config/db.js");

module.exports = {
    getAllChofer: async (req, res, next) => {
        try {
          const pool = await poolPromise;
          const result = await pool
            .request()
            .query("SELECT * FROM Chofer", function (err, resultset) {
              if (err) {
                console.log(err);
              } else {
                var Choferes = resultset.recordset;
                return res.status(200).json(Choferes);
              }
            });
        } catch (err) {
          return res
            .status(500)
            .json({ message: `Error al obtener los Choferes. Err: ${err}` });
        }
    },
    getChofer:
    async (req, res, next) => {
      try {
        const id = req.params.id;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`SELECT * FROM Chofer WHERE idChofer = ${id}`, function (err, resultset) {
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
          .json({ message: `Error al obtener los Choferes. Err: ${err}` });
      }
    },
};