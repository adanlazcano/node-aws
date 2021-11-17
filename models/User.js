const { Schema, model } = require('mongoose');
const PLM = require('passport-local-mongoose');
const { mongo } = require('mongoose');
const permisos = [
  "leer-Ranchos",
  "leer-Ganaderos",
  "leer-Proveedores",
  "leer-Vacunas",
  "leer-Palpación",
  "agregar-Ranchos",
  "agregar-Proveedores",
  "agregar-Ganaderos",
  "agregar-Vacunas",
  "agregar-Palpación",
  "eliminar-Ranchos",
  "eliminar-Ganaderos",
  "eliminar-Vacunas",
  "eliminar-Proveedores",
  "modificar-Ganaderos",
  "modificar-Proveedores",
  "modificar-Ranchos",
  "modificar-Vacunas",
  "modificar-Palpación",
  ]
const userSchema = new Schema(
  {
    email     :String,
    name      :String,
    password  :String,
    Rol       :{
    type      :String,
    default   :"owner"
    },
    acces     :{
      type    :Array,
      default :permisos
    },
    owner:{
      type: mongo.ObjectId,
      default:null
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = model('users', userSchema);
