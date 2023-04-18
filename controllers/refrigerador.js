const { poolPromise } = require("../config/db.js");

module.exports = {
    getAllRefrigerador: async (req, res, next) => {
        try {
          const pool = await poolPromise;
          const result = await pool
            .request()
            .query("SELECT * FROM Refrigerador", function (err, resultset) {
              if (err) {
                console.log(err);
              } else {
                var Refrigeradores = resultset.recordset;
                return res.status(200).json(Refrigeradores);
              }
            });
        } catch (err) {
          return res
            .status(500)
            .json({ message: `Error al obtener los Refrigeradores. Err: ${err}` });
        }
    },
    getRefrigerador:
    async (req, res, next) => {
      try {
        const id = req.params.id;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`SELECT * FROM Refrigerador WHERE idRefrigerador = '${id}'`, function (err, resultset) {
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
          .json({ message: `Error al obtener los Refrigeradores. Err: ${err}` });
      }
    },
    postRefrigerador:
    async (req, res, next) => {
      try {
        const {id, modelo} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`INSERT INTO Refrigerador VALUES('${id}', '${modelo}')`, function (err, resultset) {
            if (err) {
              console.log(err);
            } else {
              var dato = resultset.rowsAffected;
              return res.status(200).json(dato);
            }
          });
      } catch (err) {
        return res
          .status(500)
          .json({ message: `Error al agregar los Refrigeradores. Err: ${err}` });
      }
    },
    putRefrigerador:
    async (req, res, next) => {
      try {
        const id= req.params.id;

        const {modelo} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`UPDATE Refrigerador
                  SET idModelo = '${modelo}'
                  WHERE idRefrigerador = '${id}'`
                  , function (err, resultset) {
            if (err) {
              console.log(err);
            } else {
              var dato = resultset.rowsAffected;
              return res.status(200).json(dato);
            }
          });
      } catch (err) {
        return res
          .status(500)
          .json({ message: `Error al agregar los Refrigeradores. Err: ${err}` });
      }
    },
    deleteRefrigerador:
    async (req, res, next) => {
      try {
        const id= req.params.id;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`DELETE FROM Refrigerador 
                  WHERE idRefrigerador = '${id}'`
                  , function (err, resultset) {
            if (err) {
              console.log(err);
            } else {
              var dato = resultset.rowsAffected;
              return res.status(200).json(dato);
            }
          });
      } catch (err) {
        return res
          .status(500)
          .json({ message: `Error al borrar los Refrigeradores. Err: ${err}` });
      }
    },

};