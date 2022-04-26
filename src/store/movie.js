import axios from 'axios'

export default {
    // module
    namespaced: true,

    // data
    state: () => ({
        movies: []
    }),

    // computed 계산
    getters: {
    },

    // methods
    //mutations에서만 데이터를 변경할 수 있다.
    mutations: {
        updateState(state, payload) {

            // ['movies', 'message', 'loading', ...]
            Object.keys(payload).forEach(key => {
                // state.message = payload.message
                // state.movies = payload.movies
                // 위의 방식을 아래처럼 변환 가능
                state[key] = payload[key]
            })

        },
        resetMovies(state){
            state.movies = [] //변수 값 초기화
        }
    },
    //비동기로 동작
    actions: {
        async searchMovies({commit, state}, payload) {
            const {title, type, number, year} = payload;

            const OMDB_API_KEY = '7035c60c'
            const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
            const { Search, totalResults} = res.data
            commit('updateState', {
                movies: Search
            })
            console.log(res.data);
            console.log(totalResults);
            console.log(typeof totalResults);

            const total = parseInt(totalResults,10);
            const pageLength = Math.ceil(total /10);

            //추가 요청
            if(pageLength > 1) {
                for(let page = 2; page <= pageLength; page += 1){                    
                    if(page > (number / 10)) break;

                    const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)                    
                    const { Search } = res.data
                    commit('updateState', {
                        movies: [...state.movies, ...Search] //전개 연산자?
                    })
                }
            }
        }
    }
}