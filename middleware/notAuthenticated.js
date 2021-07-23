//si el usuario tiene token lo enviamos a index

export default function({store, redirect}){
    store.dispatch("readToken");//asi se llaman las acciones en la store

    

    if(store.state.auth){
        return redirect("/dashboard")
    }
}