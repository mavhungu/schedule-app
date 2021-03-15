const config = {
    atlat_uri: 'mongodb+srv://gilbert:mavhunguro101@cluster0.raol9.gcp.mongodb.net/Cluster0?retryWrites=true&w=majority',
    jwtSecret: process.env.JWT_SECRET || 'thisismynewcourse'
};
module.exports = config;
