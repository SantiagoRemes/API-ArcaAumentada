const { poolPromise } = require("../config/db.js");

module.exports = {
    getAllChecklist: async (req, res, next) => {
        try {
          const pool = await poolPromise;
          const result = await pool
            .request()
            .query("SELECT * FROM Checklist", function (err, resultset) {
              if (err) {
                console.log(err);
              } else {
                var Checklistes = resultset.recordset;
                return res.status(200).json(Checklistes);
              }
            });
        } catch (err) {
          return res
            .status(500)
            .json({ message: `Error al obtener las Checklists. Err: ${err}` });
        }
    },
    getChecklist:
    async (req, res, next) => {
      try {
        const id = req.params.id;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`SELECT * FROM Checklist WHERE idChecklist = '${id}'`, function (err, resultset) {
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
          .json({ message: `Error al obtener las Checklists. Err: ${err}` });
      }
    },
    postChecklist:
    async (req, res, next) => {
      try {
        const {id, puerta, posicion, movimientos, personas, horario} = req.body;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`INSERT INTO Checklist VALUES(${id}, ${puerta}, '${posicion}', '${movimientos}', ${personas}, '${horario}')`, function (err, resultset) {
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
          .json({ message: `Error al agregar las Checklists. Err: ${err}` });
      }
    },
    putChecklist:
    async (req, res, next) => {
      try {
        const id= req.params.id;

        const {puerta, posicion, movimientos, personas, horario} = req.body;
        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`UPDATE Checklist
                  SET puerta = ${puerta}, posicion = '${posicion}', movimientos = '${movimientos}', personas = ${personas}, horario = '${horario}'
                  WHERE idChecklist = '${id}'`
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
          .json({ message: `Error al agregar las Checklists. Err: ${err}` });
      }
    },
    deleteChecklist:
    async (req, res, next) => {
      try {
        const id= req.params.id;

        const pool = await poolPromise;
        const result = await pool
          .request()
          .query(`DELETE FROM Checklist 
                  WHERE idChecklist = '${id}'`
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
          .json({ message: `Error al borrar las Checklists. Err: ${err}` });
      }
    },

};