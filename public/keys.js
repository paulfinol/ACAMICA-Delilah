module.exports = {
    //paramaters for Database connection
    parameter: {
        host: 'localhost',
        username: 'root',
        password: '',
        database: 'Delilah',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    //master key for JWT
    masterKey: 'uAVds@f34WE@&$ed',
};