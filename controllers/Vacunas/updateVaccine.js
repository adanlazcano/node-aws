const GanadoSchema = require("./../../models/Ganado/CabezaDeGanado");
module.exports = async (req, res) => {
  try {

    console.log(req.body.data.check);
    const ganado = await GanadoSchema.findById(req.body.data.id);
    if(req.body.data.check){
    ganado.Vaccines = ganado.Vaccines.concat(req.body.data.idGroup)
    
    await ganado.save();
    }else{
      await ganado.updateOne({ $pull: { Vaccines: req.body.data.idGroup} })
    }
    // await GanadoSchema.findByIdAndUpdate(
    //   req.body.data.id,
    //   { Vacunada: req.body.data.check },
    //   function (err, docs) {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       console.log("Updated Ganado : ", docs);
    //     }
    //   }
    // );

    res.status(200).json({ message: "Updated Ganado" });
  } catch (error) {
    res.status(400).json({ message: error.name });
  }
};
