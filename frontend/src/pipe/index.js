import Vue from 'vue';
import pt from 'date-fns/locale/pt';
import { 
    parseISO, 
    format
} from 'date-fns';

// Pipe Date format
Vue.filter('date', (date, args) => {
    if(date){
        return format(parseISO(date), args != null ? args : "'Dia' dd 'de' MMMM', às ' HH:mm'h'",{locale: pt})
    }
})
