const { poolPromise } = require("../config/db.js");

module.exports = {
    getAllModelo: async (req, res, next) => {
        try {
          const pool = await poolPromise;
          const result = await pool
            .request()
            .query("SELECT * FROM ModeloRefrigerador", function (err, resultset) {
              if (err) {
                console.log(err);
              } else {
                var Modeloes = resultset.recordset;
                return res.status(200).json(Modeloes);
              }
            });
        } catch (err) {
          return res
            .status(500)
            .json({ message: `Error al obtener los Modelos. Err: ${err}` });
        }
    },
    getModelo:
    async (req, res, next) => {
      try {
        const id = req.params.id;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`SELECT * FROM ModeloRefrigerador WHERE idModelo = '${id}'`, function (err, resultset) {
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
          .json({ message: `Error al obtener los Modelos. Err: ${err}` });
      }
    },
    postModelo:
    async (req, res, next) => {
      try {
        const {id, puertas, cliente_size, bot_cap, llenado, cliente_ingreso, marca, consumo_mensual, consumo_KW, ganancia_cliente, tipo_puerta} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`INSERT INTO ModeloRefrigerador VALUES('${id}', ${puertas}, '${cliente_size}', ${bot_cap}, ${llenado}, ${cliente_ingreso}, '${marca}', ${consumo_mensual}, ${consumo_KW}, ${ganancia_cliente}, '${tipo_puerta}')`, function (err, resultset) {
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
          .json({ message: `Error al agregar los Modelos. Err: ${err}` });
      }
    },
    putModelo:
    async (req, res, next) => {
      try {
        const id= req.params.id;

        const {puertas, cliente_size, bot_cap, llenado, cliente_ingreso, marca, consumo_mensual, consumo_KW, ganancia_cliente, tipo_puerta} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`UPDATE ModeloRefrigerador
                  SET puertas = ${puertas}, cliente_size = '${cliente_size}', bot_cap = ${bot_cap}, llenado = ${llenado}, cliente_ingreso = ${cliente_ingreso}, marca = '${marca}', consumo_mensual = ${consumo_mensual}, consumo_KW = ${consumo_KW}, ganancia_cliente = ${ganancia_cliente}, tipo_puerta = '${tipo_puerta}'
                  WHERE idModelo = '${id}'`
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
          .json({ message: `Error al agregar los Modelos. Err: ${err}` });
      }
    },
    deleteModelo:
    async (req, res, next) => {
      try {
        const id= req.params.id;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`DELETE FROM ModeloRefrigerador 
                  WHERE idModelo = '${id}'`
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
          .json({ message: `Error al borrar los Modelos. Err: ${err}` });
      }
    },

};