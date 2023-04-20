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
        const {id, nombre, tamano, giro, canal, num_refrigerador, colonia, calle_no, CP, ciudad, estado, celular, puerta_altura, puerta_ancho, idDueño} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`INSERT INTO Tienda VALUES('${id}', '${nombre}', '${tamano}', '${giro}', '${canal}', ${num_refrigerador}, '${colonia}', '${calle_no}', ${CP}, '${ciudad}', '${estado}', ${celular}, ${puerta_altura}, ${puerta_ancho}, '${idDueño}')`, function (err, resultset) {
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

        const {nombre, tamano, giro, canal, num_refrigerador, colonia, calle_no, CP, ciudad, estado, celular, puerta_altura, puerta_ancho, idDueño} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`UPDATE Tienda
                  SET nombre = '${nombre}', tamaño = '${tamano}', giro = '${giro}', canal = '${canal}', num_refrigerador = ${num_refrigerador}, colonia = '${colonia}', calle_no = '${calle_no}', CP = ${CP}, ciudad = '${ciudad}', estado = '${estado}', celular = ${celular}, puerta_altura = ${puerta_altura}, puerta_ancho = ${puerta_ancho}, idDueño = '${idDueño}'
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