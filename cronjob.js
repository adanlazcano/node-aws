const CabezaDeGanado = require("./models/Ganado/CabezaDeGanado");
const cron = require("node-cron");

const calcAge = (dateGanado) => {
    const ganadoDate = new Date(dateGanado);

    const d1 = ganadoDate.getDate();
    const m1 = ganadoDate.getMonth() + 1;
    const y1 = ganadoDate.getFullYear();

    const date = new Date();
    let d2 = date.getDate();
    let m2 = 1 + date.getMonth();
    let y2 = date.getFullYear();
    const month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (d1 > d2) {
        d2 = d2 + month[m2 - 1];
        m2 = m2 - 1;
    }
    if (m1 > m2) {
        m2 = m2 + 12;
        y2 = y2 - 1;
    }
    var d = d2 - d1;
    var m = m2 - m1;
    var y = y2 - y1;

    return {
        year: y,
        month: m,
    };
};

module.exports = GanadoStatus = async(_) => {

    // *sec *min *hour *day *month *day of week

    // 0 0 */8 * * *

    cron.schedule('0 0 */1 * * *', async() => {


        await CabezaDeGanado.find((err, cabeza) => {
            if (err) return console.log(err);

            try {
                cabeza.forEach((cab) => {
                    const year = calcAge(cab.Fecha).year;
                    const month = calcAge(cab.Fecha).month;

                    console.log(`Siniiga: ${cab.Siniiga} year: ${year} month ${month}`)

                    if (year === 0 && month === 6) {
                        cab.Status = "Desarrollo";
                    } else if (year === 1) {
                        if (cab.Sexo === "H") {
                            cab.Status = "Vacía";
                        } else {
                            cab.Status = "Semental";
                        }
                    }

                    cab.save();
                });
            } catch (error) {
                console.log(error.name);
            }
        });


    });

};