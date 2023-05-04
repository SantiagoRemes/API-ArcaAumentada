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

        const {estatus, fecha, idAdministrador} = req.body;

        var query = '';

        if(fecha === 'null'){
          query = `UPDATE Solicitud SET estatus = '${estatus}', fecha_Aprobada = null, idAdministrador = '${idAdministrador}' WHERE idSolicitud = '${id}'`
        }
        else{
          query = `UPDATE Solicitud SET estatus = '${estatus}', fecha_Aprobada = '${fecha}', idAdministrador = '${idAdministrador}' WHERE idSolicitud = '${id}'`
        }


        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(query
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
    getSolicitudandTiendaAdmin:
    async (req, res, next) => {
      try {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`SELECT * FROM Solicitud S
                  JOIN Tienda T on S.idTienda=T.idTienda
                  WHERE S.estatus = 'Pendiente'`, function (err, resultset) {
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
    ActualizarSolicitud:
    async (req, res, next) => {
      try {

        const {id} = req.body
        console.log(id)
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`EXEC ActualizarSolicitud @Solicitudid = ${id}`
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
    BorrarSolicitud:
    async (req, res, next) => {
      try {

        const {id} = req.params;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`EXEC BorrarSolicitud @Solicitudid = ${id}`
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
    putChofer:
    async (req, res, next) => {
      try {
        const id= req.params.id;

        const {idChofer} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`UPDATE Solicitud
                  SET idChofer = '${idChofer}'
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
    getSolicitudChofer:
    async (req, res, next) => {
      try {
        const idChofer = req.params.idChofer;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`SELECT * FROM Solicitud S
                  JOIN Tienda T on S.idTienda=T.idTienda 
                  WHERE idChofer = ${idChofer} AND estatus = 'Aprobada'
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
    TerminarSolicitud:
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`UPDATE Solicitud 
                  SET estatus = 'Terminada', fecha_Entrega = CAST( GETDATE() AS Date )
                  WHERE idSolicitud = ${id}`
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
    getSolicitudandByEstadoAdmin:
    async (req, res, next) => {
      try {
        const { idAdmin } = req.body;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`SELECT * FROM Solicitud S
                  WHERE estatus = 'Aprobada' OR estatus = 'Terminada'
                  AND idAdministrador = '${idAdmin}' 
                  AND MONTH(GETDATE()) = MONTH(fecha_Aprobada) 
                  AND YEAR(GETDATE()) = YEAR(fecha_Aprobada)`, function (err, resultset) {
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
    getSolicitudandByEstadoChofer:
    async (req, res, next) => {
      try {
        const { estatus, idChofer } = req.body;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`SELECT * FROM Solicitud S
                  WHERE estatus = '${estatus}' 
                  AND idChofer = '${idChofer}' 
                  AND MONTH(GETDATE()) = MONTH(fecha_Entrega) 
                  AND YEAR(GETDATE()) = YEAR(fecha_Entrega)`, function (err, resultset) {
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