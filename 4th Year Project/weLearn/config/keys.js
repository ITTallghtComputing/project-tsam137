if (process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI: "mongodb+srv://admin:welearn127@welearn.avb3e.mongodb.net/welearndb?retryWrites=true&w=majority?authSource=admin",
        secret: 'yoursecret'
    };
} else {
    module.exports = {
        mongoURI: "mongodb://localhost:3000/api/profileList",
        secret: 'yoursecret'
    };
}