//?
import session from "express-session";
import MongoStore from "connect-mongo";

const uri = process.env.MONGO_URI;

//?
const sess = {
	secret: "keyboard cat",
	resave: false, // don't save session if unmodified
	saveUninitialized: true, //! false-> don't create session until something stored (true -> create)
	store: MongoStore.create({
		mongoUrl: uri,
		useUnifiedTopology: true,
	}),
	cookie: {
		maxAge: 14 * 24 * 60 * 60 * 1000,
	},
};

// todo
export default session(sess);
