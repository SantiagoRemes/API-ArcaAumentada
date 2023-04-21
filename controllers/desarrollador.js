const { poolPromise } = require("../config/db.js");

module.exports = {
    getAllDesarrollador: async (req, res, next) => {
        try {
          const pool = await poolPromise;
          const result = await pool
            .request()
            .query("SELECT * FROM Desarrollador", function (err, resultset) {
              if (err) {
                console.log(err);
              } else {
                var Desarrolladores = resultset.recordset;
                return res.status(200).json(Desarrolladores);
              }
            });
        } catch (err) {
          return res
            .status(500)
            .json({ message: `Error al obtener los Desarrolladores. Err: ${err}` });
        }
    },
    getDesarrollador:
    async (req, res, next) => {
      try {
        const id = req.params.id;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`SELECT * FROM Desarrollador WHERE idDesarrollador = ${id}`, function (err, resultset) {
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
          .json({ message: `Error al obtener los Desarrolladores. Err: ${err}` });
      }
    },
    postDesarrollador:
    async (req, res, next) => {
      try {
        const {id, nombre, contacto, usuario, contrasena} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`INSERT INTO Desarrollador VALUES(${id}, '${nombre}', ${contacto}, '${usuario}', '${contrasena}')`, function (err, resultset) {
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
          .json({ message: `Error al agregar los Desarrolladores. Err: ${err}` });
      }
    },
    putDesarrollador:
    async (req, res, next) => {
      try {
        const id= req.params.id;

        const {nombre, contacto, usuario, contrasena} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`UPDATE Desarrollador
                  SET nombre = '${nombre}', contacto = ${contacto}, usuario = '${usuario}', contrasena = '${contrasena}'  
                  WHERE idDesarrollador = ${id}`
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
          .json({ message: `Error al agregar los Desarrolladores. Err: ${err}` });
      }
    },
    deleteDesarrollador:
    async (req, res, next) => {
      try {
        const id= req.params.id;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`DELETE FROM Desarrollador 
                  WHERE idDesarrollador = ${id}`
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
          .json({ message: `Error al borrar los Desarrolladores. Err: ${err}` });
      }
    },

    loginDesarrollador:
    async (req, res, next) => {
      try {
        const {usuario, contrasena} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`Select * 
                  FROM Desarrollador 
                  WHERE usuario = '${usuario}' AND contrasena = '${contrasena}'`
                  , function (err, resultset) {
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
          .json({ message: `Error al borrar los Desarrolladores. Err: ${err}` });
      }
    },

};