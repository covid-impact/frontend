import Vuetify from "vuetify/lib";
import Vue from 'vue';
import '@fortawesome/fontawesome-free/css/all.cc'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify);

export default new Vuetify ({
	icons: {
		iconfont: 'md' || 'fa'
	}
});