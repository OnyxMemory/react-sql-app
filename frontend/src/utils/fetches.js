
var api_address = 'http://127.0.0.1:5000'

async function getClients(condition){
    try {
        const result = await fetch(`${api_address}/clientn/${condition}`)
        return await result.json();
    } catch(error) {
        console.log(error);
    }
}

async function getInvoices(client_id){
    try {
        const result = await fetch(`${api_address}/inv/${client_id}`)
        return await result.json();
    } catch (error) {
        console.log(error);
    }

}

async function postClient(id,newName){
    try{
        const result = await fetch(`${api_address}/client/${id}`, {
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
        const result = await fetch(`${api_address}/client/${id}`, {
                method: 'delete',
                headers: {'Content-type': 'application/json'},

            })
        return await result.json();      
    } catch(error) {
        console.log(error);
    }
}

async function insertClient(name){
    try{
        const result = await fetch(`${api_address}/client/all`, {
                method: 'post',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    name: name,
                })
        })
        return await result.json();
    } catch(error) {
        console.log(error);
    }

}

async function insertInvoices(location, client_id, total){
    try {
        const result = await fetch(`${api_address}/inv/all`, {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                date: new Date(),
                location: location,
                client_id: client_id,
                total: total
            })
        })
        return await result.json();
    } catch (error) {
        console.log(error)
    }

}

export {getClients, getInvoices, postClient, deleteClient, insertClient, insertInvoices}