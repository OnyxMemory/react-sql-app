
function updateState(event){
    this.setState({[event.target.name]: event.target.value})
}

export default updateState;
