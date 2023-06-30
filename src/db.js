const {Pool} = require('pg');


const pool = new Pool({
    user: 'postgres',
    host: 'database-1.cejx4qykcnpi.us-east-1.rds.amazonaws.com',
    database: 'database-1',
    password: 'uA1M5Vd93pvSyRuRCSNU',
    port: '5432'
})

module.exports = pool;