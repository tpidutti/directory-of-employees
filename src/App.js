import React from 'react';
import Table from './components/Table';
import API from './utils/API';

class App extends React.Component {
  state = {
    employees: [],
    searched: []
  };

  async componentDidMount() {
    const { data } = await API.getUsers();
    this.setState({ employees: data.results, searched: data.results });
  };

handleSort = () => {
  const sortedArr = this.state.searched.sort((a, b) => a.name.first > b.name.first ? 1 : -1);
  this.setState({searched: sortedArr});
};

handleInputChange = e => {
  const value = e.target.value.toLowerCase();
  const searchedArr = this.state.employees.filter(employee => employee.name.first.toLowerCase().startsWith(value))
  this.setState({
    searched: searchedArr,
  });
};

render() {
  console.log(this.state);
  return (
    <div>
    <nav className="navbar navbar-light bg-info">
      <div className="container-fluid justify-content-center">
        <span className="title h1">Employee Directory</span>
      </div>
    </nav>

    <input
      name="searchText"
      type="search"
      placeholder="Search by name"
      className="form-control"
      id="search"
      onChange={this.handleInputChange}
    />

    <button className="btn btn-success" onClick={this.handleSort}>Sort alphabetically</button>

    <Table users={this.state.searched} />
    </div>
  )
}
}

export default App;
