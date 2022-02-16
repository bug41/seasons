import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

    constructor(props) {
        super(props);

        //THIS IS THE ONLY TIME we do direct assignment
        //to this.state
        this.state = { lat: null, long:null, errorMessage:''};
    }

    //ONE TIME
    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition(
            (position) => 
            {
                this.setState({lat:position.coords.latitude});
                this.setState({long:position.coords.longitude});
            },
            (err) => this.setState({errorMessage: err.message})
        );
    }

    componentDidUpdate(){
        console.log('My component was just updated it rerendered')
    }

    // React says we have to define render !!
    render(){

        if(this.state.errorMessage && !this.state.lat){
            return <div>Error : {this.state.errorMessage}</div>
        }

        if(!this.state.errorMessage && this.state.lat){
            return <div>Latitude : {this.state.lat}</div>
        }

        return <div>Loading!</div>
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector("#root")
)