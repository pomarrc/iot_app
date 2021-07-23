//if the user does not have a token, we send it to login

export default function({store, redirect}){
    store.dispatch("readToken");//asi se llaman las acciones en la store

    

    if(!store.state.auth){
        return redirect("/login")
    }
}