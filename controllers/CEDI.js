const { poolPromise } = require("../config/db.js");

module.exports = {
    getAllCEDI: async (req, res, next) => {
        try {
          const pool = await poolPromise;
          const result = await pool
            .request()
            .query("SELECT * FROM CEDI", function (err, resultset) {
              if (err) {
                console.log(err);
              } else {
                var CEDIs = resultset.recordset;
                return res.status(200).json(CEDIs);
              }
            });
        } catch (err) {
          return res
            .status(500)
            .json({ message: `Error al obtener los CEDIs. Err: ${err}` });
        }
    },
    getCEDI:
    async (req, res, next) => {
      try {
        const nombre = req.params.nombre;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`SELECT * FROM CEDI WHERE CEDInombre = '${nombre}'`, function (err, resultset) {
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
          .json({ message: `Error al obtener los CEDIs. Err: ${err}` });
      }
    },
    postCEDI:
    async (req, res, next) => {
      try {
        const {nombre, pais, municipio, region} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`INSERT INTO CEDI VALUES('${nombre}', '${pais}', '${municipio}', '${region}')`, function (err, resultset) {
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
          .json({ message: `Error al agregar los CEDIs. Err: ${err}` });
      }
    },
    putCEDI:
    async (req, res, next) => {
      try {
        const nombre= req.params.nombre;

        const {pais, municipio, region} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`UPDATE CEDI
                  SET pais = '${pais}', municipio = '${municipio}', region = '${region}'
                  WHERE CEDinombre = '${nombre}'`
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
          .json({ message: `Error al agregar los CEDIs. Err: ${err}` });
      }
    },
    deleteCEDI:
    async (req, res, next) => {
      try {
        const nombre= req.params.nombre;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`DELETE FROM CEDI 
                  WHERE CEDInombre = '${nombre}'`
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
          .json({ message: `Error al borrar los CEDIs. Err: ${err}` });
      }
    },

};