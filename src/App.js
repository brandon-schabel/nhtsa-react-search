import React, {Component} from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';

const baseURL = 'https://vpic.nhtsa.dot.gov/api/vehicles/'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manufacturer: 'tesla',
      searchResults: []
    }

    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
  }

  handleChange(event) {
    this.setState({manufacturer: event.target.value});
  }

  handleSubmit(event) {
    const manufacturerDetails = 'getmanufacturerdetails/' + this.state.manufacturer + '?format=json'
    const getModelsByMake = 'getmodelsformake/' + this.state.manufacturer + '?format=json'
    // alert('A name was submitted: ' + this.state.manufacturer);
    event.preventDefault();
    axios.get(baseURL + getModelsByMake)
    .then( (response) => {
      console.log(response);
      // ther comma after setState is a callback
      this.setState( {searchResults: response.data.Results}, () => console.log(this.state))
    })
    .catch( (error) => {
      console.log(error);
    });
  }


  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label>
            Manufacturer
            <input type="text" value={this.state.manufacturer} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Submit"/>
        </form>
        <div>
          {this.state.searchResults.map(item => <div>{item.Model_Name} </div>)}
        </div>
      </div>
    );
  }
}

export default App;
