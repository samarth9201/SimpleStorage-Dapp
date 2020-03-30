import React from 'react';
import ReactDom from 'react-dom';
import getWeb3 from './getWeb3';
import SimpleStorageContract from './contracts/SimpleStorage.json';
import './index.css';

class Contract extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            name: "",
            age: 0,
            web3: null,
            accounts: null,
            contract: null
        };
    }

    componentDidMount = async() =>{

        try{
            // Get web3 instance
            const web3 = await getWeb3();

            // Using web3 to get user's account
            const accounts = await web3.eth.getAccounts();

            // Using web3 to get contract instnce
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SimpleStorageContract.networks[networkId];
            const instance = new web3.eth.Contract(
                SimpleStorageContract.abi,
                deployedNetwork && deployedNetwork.address
            );

            this.setState({
                web3: web3,
                accounts: accounts,
                contract: instance
            });
        }
        catch(error){
            alert("Unable to load web3");
            console.log(error);
        }
    }

    handleClick = async(event) =>{

        const contract = this.state.contract;
        const account = this.state.accounts[0];

        await contract.methods.set(this.state.name, this.state.age).send({from: account});
        const result = await contract.methods.get().call();

        return(
            document.getElementById('id1').innerHTML = result[0] + ", "+ result[1] + " years old"
        );
    }

    handleChange = async(event) =>{
        
        const target = event.target;
        const name = event.target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }
    render(){
        return(
            <div id="container">
              <h1>Storage Dapp</h1>
              {/* eslint-disable-next-line */}
              <h2 id="id1"></h2>
              <label htmlFor="name">Name : </label>
              <input id="name" name = "name" value= {this.state.storage} type="text" onChange={this.handleChange}></input>
              <label htmlFor="age">Age : </label>
              <input id="age" name="age" value={this.state.storage} type="text" onChange={this.handleChange}></input>
              <button onClick={this.handleClick}>Submit</button>
            </div>
        );
    }
}



ReactDom.render(
    <Contract></Contract>,
    document.getElementById('root')
);

