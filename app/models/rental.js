import { DataTypes } from 'sequelize'
import sequelize from '../database/database.js'

const Rental = sequelize.define('rental', {
    id: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        validate: {
            len: [1,]
        } 
    },
    startDate: { 
        type: DataTypes.DATE, 
        allowNull: true,
        validate: {
            isDate: true,
            isTodayOrFuture: function(value) {
                const today = new Date();
                today.setDate(today.getDate() + 1);
                today.setHours(0, 0, 0, 0);

                const startDate = new Date(value);
                startDate.setHours(0, 0, 0, 0);

                if (isNaN(startDate.getTime()) || startDate.getTime() < today.getTime()) {
                    throw new Error('A kezdő dátum nem lehet korábbi a mai napnál.');
                }
            },            
        }
    },
    endDate: { 
        type: DataTypes.DATE, 
        allowNull: true,
        validate: {
            isDate: true,
            checkDateRange(value) {
                if(this.startDate && value) {
                    const startDate = new Date(this.startDate)
                    const endDate = new Date(value)

                    startDate.setHours(0, 0, 0, 0)
                    endDate.setHours(0, 0, 0, 0)

                    const diffInDays = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24))

                    if(diffInDays < 2) {
                        throw new Error(`Hiba! A bérlés időtartalma legalább 3 nap. ${diffInDays} nap ${endDate}`)
                    }
                    if(diffInDays > 20) {
                        throw new Error('Hiba! A bérlés maximum 21 nap')
                    }
                }
            }
        }
    },
    duration: { 
        type: DataTypes.VIRTUAL, 
        get() { 
            if (this.endDate && this.startDate) {
                const millisecondsPerDay = 1000 * 60 * 60 * 24;
                return Math.floor((this.endDate - this.startDate) / millisecondsPerDay);
            }
            return null;
        } 
    },
    totalCost: { 
        type: DataTypes.VIRTUAL, 
        get() { 
            let total = 0
            if (this.rentalItems) {
                for(let i = 0; i < this.rentalItems.length; i++) {
                    total += this.rentalItems[i].dailyPrice * this.duration
                }
            }
            return total
        } 
    }
})

sequelize.sync({
    force: false
})

export default Rental
