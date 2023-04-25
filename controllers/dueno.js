const { poolPromise } = require("../config/db.js");

module.exports = {
    getAllDueño: async (req, res, next) => {
        try {
          const pool = await poolPromise;
          const result = await pool
            .request()
            .query("SELECT * FROM Dueño", function (err, resultset) {
              if (err) {
                console.log(err);
              } else {
                var Dueños = resultset.recordset;
                return res.status(200).json(Dueños);
              }
            });
        } catch (err) {
          return res
            .status(500)
            .json({ message: `Error al obtener los Dueños. Err: ${err}` });
        }
    },
    getDueño:
    async (req, res, next) => {
      try {
        const nombre = req.params.nombre;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`SELECT * FROM Dueño WHERE nombre_completo = '${nombre}'`, function (err, resultset) {
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
          .json({ message: `Error al obtener los Dueños. Err: ${err}` });
      }
    },
    postDueño:
    async (req, res, next) => {
      try {
        const {id, ciudad, estado, celular, nombre_completo, colonia, calle_no, CP} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`INSERT INTO Dueño VALUES('${id}', '${ciudad}', '${estado}', ${celular}, '${nombre_completo}', '${colonia}', '${calle_no}', ${CP})`, function (err, resultset) {
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
          .json({ message: `Error al agregar los Dueños. Err: ${err}` });
      }
    },
    putDueño:
    async (req, res, next) => {
      try {
        const id= req.params.id;

        const {ciudad, estado, celular, nombre_completo, colonia, calle_no, CP} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`UPDATE Dueño
                  SET ciudad = '${ciudad}', estado = '${estado}', celular = ${celular}, nombre_completo = '${nombre_completo}', colonia = '${colonia}', calle_no = '${calle_no}', CP = '${CP}'
                  WHERE idDueño = '${id}'`
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
          .json({ message: `Error al agregar los Dueños. Err: ${err}` });
      }
    },
    deleteDueño:
    async (req, res, next) => {
      try {
        const id= req.params.id;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`DELETE FROM Dueño 
                  WHERE idDueño = '${id}'`
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
          .json({ message: `Error al borrar los Dueños. Err: ${err}` });
      }
    },

    Dueñoid:
    async (req, res, next) => {
      try {
        const id = req.params.id;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`SELECT * FROM Dueño WHERE idDueño = '${id}'`, function (err, resultset) {
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
          .json({ message: `Error al obtener los Dueños. Err: ${err}` });
      }
    },

};