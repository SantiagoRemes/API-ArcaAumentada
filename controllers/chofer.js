const { poolPromise } = require("../config/db.js");

module.exports = {
    getAllChofer: async (req, res, next) => {
        try {
          const pool = await poolPromise;
          const result = await pool
            .request()
            .query("SELECT * FROM Chofer", function (err, resultset) {
              if (err) {
                console.log(err);
              } else {
                var Choferes = resultset.recordset;
                return res.status(200).json(Choferes);
              }
            });
        } catch (err) {
          return res
            .status(500)
            .json({ message: `Error al obtener los Choferes. Err: ${err}` });
        }
    },
    getChofer:
    async (req, res, next) => {
      try {
        const id = req.params.id;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`SELECT * FROM Chofer WHERE idChofer = ${id}`, function (err, resultset) {
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
          .json({ message: `Error al obtener los Choferes. Err: ${err}` });
      }
    },
    postChofer:
    async (req, res, next) => {
      try {
        const {id, nombre, contacto, usuario, contrasena} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`INSERT INTO Chofer VALUES(${id}, '${nombre}', ${contacto}, '${usuario}', '${contrasena}')`, function (err, resultset) {
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
          .json({ message: `Error al agregar los Choferes. Err: ${err}` });
      }
    },
    putChofer:
    async (req, res, next) => {
      try {
        const id= req.params.id;

        const {nombre, contacto, usuario, contrasena} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`UPDATE Chofer
                  SET nombre = '${nombre}', contacto = ${contacto}, usuario = '${usuario}', contrasena = '${contrasena}'  
                  WHERE idChofer = ${id}`
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
          .json({ message: `Error al agregar los Choferes. Err: ${err}` });
      }
    },
    deleteChofer:
    async (req, res, next) => {
      try {
        const id= req.params.id;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`DELETE FROM Chofer 
                  WHERE idChofer = ${id}`
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
          .json({ message: `Error al borrar los Choferes. Err: ${err}` });
      }
    },
    loginChofer:
    async (req, res, next) => {
      try {
        const {usuario, contrasena} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`Select * 
                  FROM Chofer 
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
          .json({ message: `Error al buscar los Choferes. Err: ${err}` });
      }
    },

};