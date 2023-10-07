"use strict";
const { Model } = require("sequelize");
const user = require(`./user`);
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // mendefinisikan relasi transaksi -> meja
      // relasi: 1 to 1 (hasOne atau belongsTo)
      // parent: meja, child: transaksi
      this.belongsTo(models.meja, {
        foreignKey: `id_meja`,
        as: `meja`,
      });

      // mendefinisikan nilai transaksi -> user
      // relasi: 1 to 1
      // parent: user, child: transaksi
      this.belongsTo(models.user, {
        foreignKey: `id_user`,
        as: `user`,
      });

      //mendefinisikan relasi transaksi -> detail transaksi
      // relasi: 1 to N (many)
      //parent: transaksi, child: detail_transaksi
      this.hasMany(models.detail_transaksi, {
        foreignKey: "id_transaksi",
        as: `detail_transaksi`,
      });
    }
  }
  transaksi.init(
    {
      id_transaksi: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      tgl_transaksi: DataTypes.DATE,
      id_user: DataTypes.INTEGER,
      id_meja: DataTypes.INTEGER,
      nama_pelanggan: DataTypes.STRING,
      status: DataTypes.ENUM("belum_bayar", "lunas"),
    },
    {
      sequelize,
      modelName: "transaksi",
      tableName: "transaksi",
    }
  );
  return transaksi;
};
