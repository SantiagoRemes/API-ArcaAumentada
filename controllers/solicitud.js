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

        const {estatus} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`UPDATE Solicitud
                  SET estatus = '${estatus}'
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
    getSolicitudandTiendaDes:
    async (req, res, next) => {
      try {
        const idDes = req.params.idDes;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`SELECT * FROM Solicitud S
                  JOIN Tienda T on S.idTienda=T.idTienda 
                  WHERE idDesarrollador = ${idDes} AND estatus != 'Terminada'
                  ORDER BY idSolicitud DESC`, function (err, resultset) {
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
    getSolicitudandTiendaChofer:
    async (req, res, next) => {
      try {
        const idChofer = req.params.idDes;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`SELECT * FROM Solicitud S
                  JOIN Tienda T on S.idTienda=T.idTienda 
                  WHERE idChofer = ${idCofer}`, function (err, resultset) {
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
    getSolicitudandTiendaAdmin:
    async (req, res, next) => {
      try {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`SELECT * FROM Solicitud S
                  JOIN Tienda T on S.idTienda=T.idTienda`, function (err, resultset) {
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
    getSolicitudandByEstado:
    async (req, res, next) => {
      try {
        const { estatus, idDes } = req.body;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`SELECT * FROM Solicitud S
                  WHERE estatus = '${estatus}' 
                  AND idDesarrollador = '${idDes}' 
                  AND MONTH(GETDATE()) = MONTH(fecha_solicitud) 
                  AND YEAR(GETDATE()) = YEAR(fecha_solicitud)`, function (err, resultset) {
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
    getSolicitudandIdDesDate:
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`SELECT * FROM Solicitud S
                  WHERE idDesarrollador = '${id}' 
                  AND MONTH(GETDATE()) = MONTH(fecha_solicitud) 
                  AND YEAR(GETDATE()) = YEAR(fecha_solicitud) AND estatus != 'Negada'`, function (err, resultset) {
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
    getFullSolicitud:
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`SELECT * FROM Solicitud S
                  JOIN Tienda T ON S.idTienda=T.idTienda
                  JOIN Dueño D ON T.idDueño=D.idDueño
                  JOIN CEDI C ON S.CEDINombre=C.CEDINombre
                  JOIN Chofer Ch ON S.idChofer=Ch.idChofer
                  JOIN Administrador A ON S.idAdministrador=A.idAdministrador
                  JOIN Desarrollador Des ON S.idDesarrollador=Des.idDesarrollador
                  WHERE S.idSolicitud = '${id}' `, function (err, resultset) {
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