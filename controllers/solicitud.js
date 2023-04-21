const { poolPromise } = require("../config/db.js");

module.exports = {
    getAllSolicitud: async (req, res, next) => {
        try {
          const pool = await poolPromise;
          const result = await pool
            .request()
            .query("SELECT * FROM Solicitud", function (err, resultset) {
              if (err) {
                console.log(err);
              } else {
                var Solicitudes = resultset.recordset;
                return res.status(200).json(Solicitudes);
              }
            });
        } catch (err) {
          return res
            .status(500)
            .json({ message: `Error al obtener los Solicitudes. Err: ${err}` });
        }
    },
    getSolicitud:
    async (req, res, next) => {
      try {
        const id = req.params.id;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`SELECT * FROM Solicitud WHERE idSolicitud = '${id}'`, function (err, resultset) {
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
          .json({ message: `Error al obtener los Solicitudes. Err: ${err}` });
      }
    },
    postSolicitud:
    async (req, res, next) => {
      try {
        const {id, fecha_solicitud, fecha_aprobada, fecha_entrega, estatus, idChofer, idAdministrador, idDesarrollador, idTienda, CEDINombre} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`INSERT INTO Solicitud VALUES('${id}', '${fecha_solicitud}', '${fecha_aprobada}', '${fecha_entrega}', '${estatus}', ${idAdministrador}, ${idChofer}, ${idDesarrollador}, '${idTienda}', '${CEDINombre}')`, function (err, resultset) {
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
          .json({ message: `Error al agregar los Solicitudes. Err: ${err}` });
      }
    },
    putSolicitud:
    async (req, res, next) => {
      try {
        const id= req.params.id;

        const {fecha_solicitud, fecha_aprobada, fecha_entrega, estatus, idChofer, idAdministrador, idDesarrollador, idTienda, CEDINombre} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`UPDATE Solicitud
                  SET fecha_solicitud = '${fecha_solicitud}', fecha_aprobada = '${fecha_aprobada}', fecha_entrega = '${fecha_entrega}', estatus = '${estatus}', idChofer = ${idChofer}, idAdministrador = ${idAdministrador}, idDesarrollador = ${idDesarrollador}, idTienda = '${idTienda}', CEDINombre = '${CEDINombre}'
                  WHERE idSolicitud = '${id}'`
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
          .json({ message: `Error al agregar los Solicitudes. Err: ${err}` });
      }
    },
    deleteSolicitud:
    async (req, res, next) => {
      try {
        const id= req.params.id;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`DELETE FROM Solicitud 
                  WHERE usuario = '${id}'`
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
          .json({ message: `Error al borrar los Solicitudes. Err: ${err}` });
      }
    },
    getSolicitudbyDes:
    async (req, res, next) => {
      try {
        const idDes = req.params.idDes;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`SELECT * FROM Solicitud WHERE idDesarrollador = ${idDes}`, function (err, resultset) {
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
          .json({ message: `Error al obtener los Solicitudes. Err: ${err}` });
      }
    },

};