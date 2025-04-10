import { DataTypes } from 'sequelize'
import sequelize from '../database/database.js'
import Rental from './rental.js'

const Rentalitem = sequelize.define('rentalitem', {
    id: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    rentalId: { 
        type: DataTypes.INTEGER,  
        allowNull: false,
        references: {
            model: Rental,
            key: 'id'
        }
    },
    jewelryId: { type: DataTypes.INTEGER,  allowNull: false  },
    dailyPrice: { type: DataTypes.DOUBLE,  allowNull: false  }
})

Rental.hasMany(Rentalitem, { foreignKey: 'rentalId', as: 'rentalItems' })
Rentalitem.belongsTo(Rental, { foreignKey: 'rentalId' })

sequelize.sync({
    force: false
})

export default Rentalitem
