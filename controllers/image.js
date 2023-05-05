const { poolPromise } = require("../config/db.js");

module.exports = {
    addImage: async (req, res, next) => {
        try{
            const id = req.params.id
            const path = "/images/" + req.file.filename;
            const pool = await poolPromise;
            const result = await pool
                .request()
                .query(`UPDATE RefrigeradorSolicitado SET imageurl = 'http://192.168.1.131:2000${path}' WHERE idRefrigeradorSolicitado = ${id}`, function (err, resultset) {
                    if (err) {
                        console.log(err);
                    } else {
                        var Images = resultset.rowsAffected;
                        return res.status(200).json(Images);
                    }
                });
        } catch (err) {
            return res
            .status(500)
            .json({ message: `Error al obtener las Checklists. Err: ${err}` });
        }
    },
    
};