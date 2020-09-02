import React from 'react';

import './app.css';
import photofile from './images/photofile.png';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      years: [],
      isLoaded: false,
      value: " ",
      isLaunch: " ",
      isLanding: " "
    };
    this.handleLanding = this.handleLanding.bind(this);
    this.handleLaunch = this.handleLaunch.bind(this);
    this.handleLaunchh = this.handleLaunchh.bind(this);
  }
  componentDidMount() {
      fetch('https://api.spacexdata.com/v3/launches?limit=100')
      .then(res => res.json())
      .then(result => {
          this.setState({
            isLoaded: true,
            items: result,
          });
        })
   }
 
   handleLaunchh (event)  {
      let url_str = "https://api.spaceXdata.com/v3/launches?limit=100&launch_success="+this.setState.isLaunch+"&land_success="+this.setState.isLanding+"&launch_year="+event.target.innerText;
  
    fetch(url_str) 
    .then(res => res.json())
    .then(result => {
       this.setState({
          isLoaded: true,
          items : result
        });
      })
   }
   
  handleLanding(event) {
    let url;
    if (event.target.innerText !== "True") {
      this.setState.isLanding = "false"
      url = 'https://api.spacexdata.com/v3/launches?limit=100&land_success=false'
    }else{
      this.setState.isLanding = "true"
      url = 'https://api.spacexdata.com/v3/launches?limit=100&land_success=true'
    }
    fetch(url)
    .then(res => res.json())
    .then(result => {
        this.setState({
          isLoaded: true,
          items: result,
        });
      })

  }
 
  handleLaunch(event) {
    let url;
 
    if (event.target.innerText !== "True") {
      this.setState.isLaunch = "false"
      url = 'https://api.spacexdata.com/v3/launches?limit=100&launch_success=false'
    }else{
      this.setState.isLaunch = "true"
      url = 'https://api.spacexdata.com/v3/launches?limit=100&launch_success=true'
    }
    fetch(url)
    .then(res => res.json())
    .then(result => {
        this.setState({
          isLoaded: true,
          items: result,
        });
      })
   }
   

  handleSubmit(event) {
    const { items, value } = this.state;
    if (value.match( items["post code"])) {
      alert('submitted: ' + this.state.value);
    } else {
      alert('Not Submitted: ' + this.state.value);
    }
    event.preventDefault();
  }

  
  render() {
    const { items, years } = this.state;

    if (this.state.isLoaded === false) {
      return (<div className="loading">Loading ... </div>);
    } else {
      return (
        <React.Fragment>

          <h2 style={{padding:"12px"}}>Space X Lunch Programs</h2>
          {items.map(function (index, l) { 
              if (years.includes(items[l].launch_year)){

              }else{
                years.push(items[l].launch_year)
              }
              return <span key={l}></span>
          })}
          <div id="item">
            <div style={{padding:"12px", backgroundColor:"#ffffff", color: "#000000",}}>
                <h3>Filters</h3>
                <p className="filter_year_text">Lunch Year</p>
                <div className="line"></div>
                <div className="filter_button">
                  {years.map(year =>  { 
                    return (
                      <span className="filter_year_btn" key={year}>
                         <button className="button" onClick={this.handleLaunchh}>{year}</button>
                      </span>
                    );
                  })}
                </div>
            </div>
            <div style={{padding:"12px", backgroundColor:"#ffffff", color: "#000000",}}>
                <p className="filter_year_text">Sucessfull Launch</p>
                <div className="line"></div>
                <div className="filter_button">
                  <button className="button" onClick={this.handleLaunch}>  True </button>
                  <button className="button" onClick={this.handleLaunch}> False </button>
                </div>
                <div style={{minHeight: "170px", padding:"12px 0px", backgroundColor:"#ffffff", color: "#000000",}}>
                  <p className="filter_year_text">Sucessfull Landing</p>
                  <div className="line"></div>
                  <div className="filter_button">
                    <button className="button" onClick={this.handleLanding}>  True </button>
                    <button className="button" onClick={this.handleLanding}> False </button>
                  </div>
                </div>
            </div>
          </div>

          <div className="container" id="containers"> 
            {items.map(function (index, k) { 
              let is_launch_success;
                 if (items[k].launch_success=== true ){
                  is_launch_success = "true"
                 }else{
                  is_launch_success = "false"
                 } 
              let is_landing_success;
                 if (items[k].rocket.first_stage.cores[0].land_success === true ){
                  is_landing_success = "true"
                 }else if (items[k].rocket.first_stage.cores[0].land_success === false ){
                  is_landing_success = "false"
                 }else{
                  is_landing_success = "null"
                 }

                // if (years.includes(items[k].launch_year)){

                // }else{
                //  years.push(items[k].launch_year)
                // }
                let src;
                if (items[k].links.mission_patch_small === null) {
                  src = photofile
                }else{
                  src = (items[k].links.mission_patch_small)
                }

                return( <div className="item" key={k}>
                  {<React.Fragment><img className="image" src={src} alt="img" /><table><thead><tr><td colSpan="2" className="thead">{items[k].mission_name}# {items[k].flight_number}</td></tr></thead><tbody><tr><td>Mission Ids</td><td className="right">{items[k].mission_id}</td></tr><tr><td>launch Year</td><td className="right">{items[k].launch_year}</td></tr><tr><td>Launch Success</td><td className="right">{is_launch_success}</td></tr><tr><td>success Landing</td><td className="right">{is_landing_success}</td></tr></tbody></table></React.Fragment>}
                </div>);
            })}
          </div>

          </React.Fragment>
      );
    }
  }
}
export default App;