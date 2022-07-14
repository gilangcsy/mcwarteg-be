module.exports = {
    HOST: 'localhost',
    USER: 'postgres',
    PASSWORD: 'postgres',
    DB: 'mcwarteg',
    DIALECT: 'postgres',
    POOL: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    TIMEZONE: "+07:00",
    VERSION: '/api/v1'
}