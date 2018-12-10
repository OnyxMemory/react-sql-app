
async function getClients(condition){
    try {
        const result = await fetch(`http://127.0.0.1:5000/clientn/${condition}`)
        return await result.json();
    } catch(error) {
        console.log(error);
    }
}

async function getInvoices(client_id){
    try {
        const result = await fetch(`http://127.0.0.1:5000/inv/${client_id}`)
        return await result.json();
    } catch (error) {
        console.log(error);
    }

}

async function postClient(id,newName){
    try{
        const result = await fetch(`http://127.0.0.1:5000/client/${id}`, {
           method: 'put',
           headers: {'Content-type': 'application/json'},
           body: JSON.stringify({
               name: newName
           })       
       })
       return await result.json();
    } catch(error) {
        console.log(error)
    }
}

async function deleteClient(id) {
    try{
        const result = await fetch(`http://127.0.0.1:5000/client/${id}`, {
                method: 'delete',
                headers: {'Content-type': 'application/json'},

            })
        return await result.json();      
    } catch(error) {
        console.log(error);
    }
}

export {getClients, getInvoices, postClient, deleteClient}