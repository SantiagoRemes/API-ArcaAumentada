const { poolPromise } = require("../config/db.js");

module.exports = {
    getAllRefriSolicitado: async (req, res, next) => {
        try {
          const pool = await poolPromise;
          const result = await pool
            .request()
            .query("SELECT * FROM RefrigeradorSolicitado", function (err, resultset) {
              if (err) {
                console.log(err);
              } else {
                var RefriSolicitadoes = resultset.recordset;
                return res.status(200).json(RefriSolicitadoes);
              }
            });
        } catch (err) {
          return res
            .status(500)
            .json({ message: `Error al obtener los RefriSolicitadoes. Err: ${err}` });
        }
    },
    getRefriSolicitado:
    async (req, res, next) => {
      try {
        const id = req.params.id;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`SELECT * FROM RefrigeradorSolicitado WHERE idRefrigeradorSolicitado = '${id}'`, function (err, resultset) {
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
          .json({ message: `Error al obtener los RefriSolicitadoes. Err: ${err}` });
      }
    },
    postRefriSolicitado:
    async (req, res, next) => {
      try {
        const {id, idRefrigerador, idSolicitud, fecha_Entrega, movimiento, comentarios, idChecklist} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`INSERT INTO RefrigeradorSolicitado VALUES(${id}, '${idRefrigerador}', '${idSolicitud}', '${fecha_Entrega}', '${movimiento}', '${comentarios}', ${idChecklist})`, function (err, resultset) {
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
          .json({ message: `Error al agregar los RefriSolicitadoes. Err: ${err}` });
      }
    },
    putRefriSolicitado:
    async (req, res, next) => {
      try {
        const id= req.params.id;

        const {idRefrigerador, idSolicitud, fecha_Entrega, movimiento, comentarios, idChecklist} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`UPDATE RefrigeradorSolicitado
                  SET idRefrigerador = '${idRefrigerador}', idSolicitud = '${idSolicitud}', fecha_Entrega = '${fecha_Entrega}', movimiento = '${movimiento}', comentarios = '${comentarios}', idChecklist = ${idChecklist}
                  WHERE idRefrigeradorSolicitado = '${id}'`
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
          .json({ message: `Error al agregar los RefriSolicitadoes. Err: ${err}` });
      }
    },
    deleteRefriSolicitado:
    async (req, res, next) => {
      try {
        const id= req.params.id;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`DELETE FROM RefrigeradorSolicitado 
                  WHERE idRefrigeradorSolicitado = '${id}'`
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
          .json({ message: `Error al borrar los RefriSolicitadoes. Err: ${err}` });
      }
    },

};