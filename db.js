// mongoDB와 node.js의 오브젝트를 연결해주는 ORM library
const mongoose = require("mongoose");
const MONGO_URI = "mongodb://dbuser:5ad8A47d8@ytglobal.iptime.org:17017/training";
const COLLECTION_NANE = "todo_list";

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(MONGO_URI);
// Node.js의 native Promise 사용
mongoose.Promise = global.Promise;

// mongoDB 연결
mongoose
    .connect(MONGO_URI, { useMongoClient: true })
    .then(() => console.log("Successfully connected to mongodb"))
    .catch((e) => console.error(e));

// Define schemes
const todoSchema = new mongoose.Schema({
    name: { type: String, required: true},
    id: { type: Number, required: true},
    task: { type: String, required: true},
    done: { type: Boolean, default: false}
},
{
    collection: COLLECTION_NANE
});

// Create Model
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;