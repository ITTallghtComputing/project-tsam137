module.exports = {
    mongoUri: process.env.MONGO_URI || 'mongodb+srv://admin:welearn127@welearn.avb3e.mongodb.net/welearndb?retryWrites=true&w=majority' ,
    PORT: process.env.PORT || 3000,
}
