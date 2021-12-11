import	{ createStore }	from "vuex";
import 	{ auth } 		from "./auth.module";
import 	{ reservation }	from "./reservation.module";

export default createStore({
	modules: { 
		auth,
		reservation
	},
});
