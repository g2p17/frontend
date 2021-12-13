import	{ createStore }	from "vuex";
import 	{ auth } 		from "./auth.module";
import 	{ reservation }	from "./reservation.module";
import 	{ parking }	from "./parking.module";

export default createStore({
	modules: { 
		auth,
		reservation,
		parking
	},
});
