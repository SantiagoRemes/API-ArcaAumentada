const { poolPromise } = require("../config/db.js");

module.exports = {
    getAllAdministrador: async (req, res, next) => {
        try {
          const pool = await poolPromise;
          const result = await pool
            .request()
            .query("SELECT * FROM Administrador", function (err, resultset) {
              if (err) {
                console.log(err);
              } else {
                var Administradores = resultset.recordset;
                return res.status(200).json(Administradores);
              }
            });
        } catch (err) {
          return res
            .status(500)
            .json({ message: `Error al obtener los Administradores. Err: ${err}` });
        }
    },
    getAdministrador:
    async (req, res, next) => {
      try {
        const id = req.params.id;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`SELECT * FROM Administrador WHERE idAdministrador = ${id}`, function (err, resultset) {
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
          .json({ message: `Error al obtener los Administradores. Err: ${err}` });
      }
    },
    postAdministrador:
    async (req, res, next) => {
      try {
        const {id, nombre, contacto, usuario, contrasena} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`INSERT INTO Administrador VALUES(${id}, '${nombre}', ${contacto}, '${usuario}', '${contrasena}')`, function (err, resultset) {
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
          .json({ message: `Error al agregar los Administradores. Err: ${err}` });
      }
    },
    putAdministrador:
    async (req, res, next) => {
      try {
        const id= req.params.id;

        const {nombre, contacto, usuario, contrasena} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`UPDATE Administrador
                  SET nombre = '${nombre}', contacto = ${contacto}, usuario = '${usuario}', contrasena = '${contrasena}'  
                  WHERE idAdministrador = ${id}`
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
          .json({ message: `Error al agregar los Administradores. Err: ${err}` });
      }
    },
    deleteAdministrador:
    async (req, res, next) => {
      try {
        const id= req.params.id;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`DELETE FROM Administrador 
                  WHERE idAdministrador = ${id}`
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
          .json({ message: `Error al borrar los Administradores. Err: ${err}` });
      }
    },
    loginAdministrador:
    async (req, res, next) => {
      try {
        const {usuario, contrasena} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`Select * 
                  FROM Administrador 
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
          .json({ message: `Error al buscar los Administradores. Err: ${err}` });
      }
    },

};