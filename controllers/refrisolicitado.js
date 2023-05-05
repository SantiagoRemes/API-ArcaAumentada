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
        const {id, idModelo, idSolicitud, fecha_Entrega, movimiento, comentarios, idChecklist} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`INSERT INTO RefrigeradorSolicitado VALUES(${id}, '${idModelo}', '${idSolicitud}', '${fecha_Entrega}', '${movimiento}', '${comentarios}', ${idChecklist})`, function (err, resultset) {
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

        const {idModelo, idSolicitud, fecha_Entrega, movimiento, comentarios, idChecklist, imageurl} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`UPDATE RefrigeradorSolicitado
                  SET idModelo = '${idModelo}', idSolicitud = '${idSolicitud}', fecha_Entrega = '${fecha_Entrega}', movimiento = '${movimiento}', comentarios = '${comentarios}', imageurl = '${imageurl}',idChecklist = ${idChecklist}
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
    RefriPorTienda:
    async (req, res, next) => {
      try {
        const { idTienda, idSolicitud} = req.body;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`Select * 
                  FROM RefrigeradorSolicitado RS 
                  JOIN Solicitud S on RS.idSolicitud=S.idSolicitud
                  JOIN ModeloRefrigerador MR on RS.idModelo=MR.idModelo
                  JOIN Tienda T on S.idTienda=T.idTienda
                  WHERE T.idTienda = '${idTienda}' 
                  AND S.estatus = 'Terminada'
                  AND idRefrigeradorSolicitado NOT IN (SELECT idRefrigeradorSolicitado
                                                        FROM RefrigeradorSolicitado RS
                                                        JOIN ModeloRefrigerador MR on RS.idModelo=MR.idModelo
                                                        WHERE RS.idSolicitud = ${idSolicitud})`
                  , function (err, resultset) {
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
    CountRefri:
    async (req, res, next) => {
      try {
        const id= req.params.id;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`Select Count(RS.idModelo)
                  FROM RefrigeradorSolicitado RS JOIN Solicitud S on RS.idSolicitud=S.idSolicitud
                  JOIN ModeloRefrigerador MR on RS.idModelo=MR.idModelo
                  JOIN Tienda T on S.idTienda=T.idTienda
                  WHERE T.idTienda = '${id}'
                  GROUP BY RS.idModelo`
                  , function (err, resultset) {
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
    SumPuertas:
    async (req, res, next) => {
      try {
        const id= req.params.id;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`Select Sum(Puertas) as puertastot
                  FROM RefrigeradorSolicitado RS JOIN Solicitud S on RS.idSolicitud=S.idSolicitud
                  JOIN ModeloRefrigerador MR on RS.idModelo=MR.idModelo
                  JOIN Tienda T on S.idTienda=T.idTienda
                  WHERE T.idTienda = '${id}'
                  AND S.estatus = 'Terminada'
                  `
                  , function (err, resultset) {
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
    RefriSolicitado:
    async (req, res, next) => {
      try {
        const id= req.params.id;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`Select *
                  FROM RefrigeradorSolicitado RS
                  JOIN ModeloRefrigerador MR on RS.idModelo=MR.idModelo
                  WHERE RS.idSolicitud = ${id}`
                  , function (err, resultset) {
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
    RefriSolicitadoPuertas:
    async (req, res, next) => {
      try {
        const id= req.params.id;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`Select SUM(puertas) as puertas
                  FROM RefrigeradorSolicitado RS
                  JOIN ModeloRefrigerador MR on RS.idModelo=MR.idModelo
                  WHERE RS.idSolicitud = ${id}
                  GROUP BY RS.idSolicitud`
                  , function (err, resultset) {
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
    UpdateMovimiento:
    async (req, res, next) => {
      try {
        const id= req.params.id;

        const {movimiento} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`UPDATE RefrigeradorSolicitado
                  SET movimiento = '${movimiento}'
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
      RefriPorTiendaMov:
    async (req, res, next) => {
      try {
        const { idTienda, idSolicitud, movimiento} = req.body;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`Select * 
                  FROM RefrigeradorSolicitado RS 
                  JOIN Solicitud S on RS.idSolicitud=S.idSolicitud
                  JOIN ModeloRefrigerador MR on RS.idModelo=MR.idModelo
                  JOIN Tienda T on S.idTienda=T.idTienda
                  WHERE T.idTienda = '${idTienda}' 
                  AND movimiento = '${movimiento}'
                  AND idRefrigeradorSolicitado NOT IN (SELECT idRefrigeradorSolicitado
                                                        FROM RefrigeradorSolicitado RS
                                                        JOIN ModeloRefrigerador MR on RS.idModelo=MR.idModelo
                                                        WHERE RS.idSolicitud = ${idSolicitud})`
                  , function (err, resultset) {
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
    UpdateComentarios:
    async (req, res, next) => {
      try {
        const id= req.params.id;

        const {comentarios} = req.body;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`UPDATE RefrigeradorSolicitado
                  SET comentarios = '${comentarios}'
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
    EDFUnico:
    async (req, res, next) => {
      try {
        const {idModelo, idSolicitud} = req.body;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`Select * FROM RefrigeradorSolicitado
                  WHERE fecha_Entrega = '' AND idModelo = '${idModelo}' AND (idSolicitud IS null OR idSolicitud=${idSolicitud})`
                  , function (err, resultset) {
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
    ChangeEDF:
    async (req, res, next) => {
      try {
        const { idRefri1, idRefri2} = req.body;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`EXEC ChangeRefri @RSid1=${idRefri1}, @RSid2=${idRefri2}`
                  , function (err, resultset) {
            if (err) {
              console.log(err);
            } else {
              var RefriSolicitadoes = resultset.rowsAffected;
              return res.status(200).json(RefriSolicitadoes);
            }
          });
      } catch (err) {
        return res
          .status(500)
          .json({ message: `Error al obtener los RefriSolicitadoes. Err: ${err}` });
      }
    },
};