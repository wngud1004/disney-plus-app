import axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "f84c9c1151203c5dd2c32cc2dde2d614",
        language: "ko-KR" // 한국어로 받아옴
    }
})

export default instance;