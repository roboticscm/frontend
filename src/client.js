import * as sapper from '@sapper/app';
import '../sass/index.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

sapper.start({
	target: document.querySelector('#sapper')
});