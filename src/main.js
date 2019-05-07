import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import Mint from 'mint-ui';
import "mint-ui/lib/style.css"
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import axios from "axios";
import Loading from 'muse-ui-loading';
import 'muse-ui-loading/dist/muse-ui-loading.css';

Vue.use(Loading);
Vue.prototype.$ajax = axios;
Vue.use(MuseUI);
Vue.use(Mint);

new Vue({
	el:'#app',
	router,
	store,
	render:h=>h(App)
})