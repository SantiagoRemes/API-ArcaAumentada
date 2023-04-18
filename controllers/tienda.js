const { poolPromise } = require("../config/db.js");

module.exports = {
    getAllTienda: async (req, res, next) => {
        try {
          const pool = await poolPromise;
          const result = await pool
            .request()
            .query("SELECT * FROM Tienda", function (err, resultset) {
              if (err) {
                console.log(err);
              } else {
                var Tiendas = resultset.recordset;
                return res.status(200).json(Tiendas);
              }
            });
        } catch (err) {
          return res
            .status(500)
            .json({ message: `Error al obtener los Tiendas. Err: ${err}` });
        }
    },
    getTienda:
    async (req, res, next) => {
      try {
        const id = req.params.id;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`SELECT * FROM Tienda WHERE idTienda = '${id}'`, function (err, resultset) {
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
          .json({ message: `Error al obtener los Tiendas. Err: ${err}` });
      }
    },
    postTienda:
    async (req, res, next) => {
      try {
        const {id, fecha_Tienda, fecha_aprobada, fecha_entrega, estatus, idChofer, idAdministrador, idDesarrollador, idTienda, CEDINombre} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`INSERT INTO Tienda VALUES('${id}', '${fecha_Tienda}', '${fecha_aprobada}', '${fecha_entrega}', '${estatus}', ${idAdministrador}, ${idChofer}, ${idDesarrollador}, '${idTienda}', '${CEDINombre}')`, function (err, resultset) {
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
          .json({ message: `Error al agregar los Tiendas. Err: ${err}` });
      }
    },
    putTienda:
    async (req, res, next) => {
      try {
        const id= req.params.id;

        const {fecha_Tienda, fecha_aprobada, fecha_entrega, estatus, idChofer, idAdministrador, idDesarrollador, idTienda, CEDINombre} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`UPDATE Tienda
                  SET fecha_Tienda = '${fecha_Tienda}', fecha_aprobada = '${fecha_aprobada}', fecha_entrega = '${fecha_entrega}', estatus = '${estatus}', idChofer = ${idChofer}, idAdministrador = ${idAdministrador}, idDesarrollador = ${idDesarrollador}, idTienda = '${idTienda}', CEDINombre = '${CEDINombre}'
                  WHERE idTienda = '${id}'`
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
          .json({ message: `Error al agregar los Tiendas. Err: ${err}` });
      }
    },
    deleteTienda:
    async (req, res, next) => {
      try {
        const id= req.params.id;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`DELETE FROM Tienda 
                  WHERE idTienda = '${id}'`
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
          .json({ message: `Error al borrar los Tiendas. Err: ${err}` });
      }
    },

};