const mongoose = require("mongoose")
const url = "mongodb+srv://yogiAvadhut:XGzhE6SqexJnQ4Xu@sainicluster1.iybzgpq.mongodb.net/mydb"


async function connectDb() {
    await mongoose.connect(url)
}

module.exports = connectDb;