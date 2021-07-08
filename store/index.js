export const state = () =>({//estados globales
    auth: null,
    devices: []
});

//no se pueden cambiar los valores a menos usar mutaciones
//mutaciones
export const mutations = {
    setAuth(state, auth){
        state.auth = auth
    }
}