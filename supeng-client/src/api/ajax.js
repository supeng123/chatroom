import axios from 'axios'

export default function ajax(url, data={}, type='GET') {
    if (type==='GET') {
        let parameterString = Object.keys(data).reduce((total, next) => {
            total += next + '=' + data[next] + '&';
            return total;
        }, '');

        if (parameterString) parameterString = parameterString.substring(0, parameterString.length - 1);

        return axios.get(url + '?' + parameterString);
    } else {
        return axios.post(url, data);
    }
}