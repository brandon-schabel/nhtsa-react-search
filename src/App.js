import React, {Component} from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';

const baseURL = 'https://vpic.nhtsa.dot.gov/api/vehicles/'
let allMakes = []


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manufacturer: 'tesla',
      searchResults: [],
      allMakes: [],
      makerDropSelect: ''
    }

    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
    this.handleDropDownChange = this
    .handleChange
    .bind(this);
  }

  componentWillMount () {
    const allMakesURL = baseURL + 'GetAllMakes?format=json'
    axios.get(allMakesURL)
    .then( (response) => {
      console.log(response);
      // ther comma after setState is a callback
      //console.log(allMakes)
      //allMakes
      this.setState({ allMakes: response.data.Results }, () => console.log(this.state))
    })
    .catch( (error) => {
      console.log(error);
    });

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

  handleDropDownChange(event) {
    this.setState({manufacturer: event.target.value})
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
          {this.state.searchResults.map(item => <div key={item.Model_Name}>{item.Model_Name} </div>)}
        </div>
        <div>
          <select value={this.state.manufacturer} onChange={this.handleDropDownChange}>
            {this.state.allMakes.map(item => <option value={item.Make_Name} key={item.Make_ID}>{item.Make_Name}</option>)}
          </select>
        </div>
      </div>
    );
  }
}

export default App;

<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>