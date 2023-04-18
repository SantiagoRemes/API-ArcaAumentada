const { poolPromise } = require("../config/db.js");

module.exports = {
    getAllVisita: async (req, res, next) => {
        try {
          const pool = await poolPromise;
          const result = await pool
            .request()
            .query("SELECT * FROM Visita", function (err, resultset) {
              if (err) {
                console.log(err);
              } else {
                var Visitas = resultset.recordset;
                return res.status(200).json(Visitas);
              }
            });
        } catch (err) {
          return res
            .status(500)
            .json({ message: `Error al obtener los Visitas. Err: ${err}` });
        }
    },
    getVisita:
    async (req, res, next) => {
      try {
        const id = req.params.id;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`SELECT * FROM Visita WHERE idVisita = '${id}'`, function (err, resultset) {
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
          .json({ message: `Error al obtener los Visitas. Err: ${err}` });
      }
    },
    postVisita:
    async (req, res, next) => {
      try {
        const {id, idTienda, idDesarrollador, fecha, comentarios} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`INSERT INTO Visita VALUES(${id}, '${idTienda}', ${idDesarrollador}, '${fecha}', '${comentarios}')`, function (err, resultset) {
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
          .json({ message: `Error al agregar los Visitas. Err: ${err}` });
      }
    },
    putVisita:
    async (req, res, next) => {
      try {
        const id= req.params.id;

        const {idTienda, idDesarrollador, fecha, comentarios} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`UPDATE Visita
                  SET idTienda = '${idTienda}', idDesarrollador = ${idDesarrollador}, fecha = '${fecha}', comentarios = '${comentarios}'
                  WHERE idVisita = '${id}'`
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
          .json({ message: `Error al agregar los Visitas. Err: ${err}` });
      }
    },
    deleteVisita:
    async (req, res, next) => {
      try {
        const id= req.params.id;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`DELETE FROM Visita 
                  WHERE idVisita = '${id}'`
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
          .json({ message: `Error al borrar los Visitas. Err: ${err}` });
      }
    },

};