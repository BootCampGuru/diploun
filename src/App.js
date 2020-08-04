import React,{Component} from 'react';
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { BarChart } from "reaviz";
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import {Form, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col} from 'reactstrap'
import { Map, TileLayer, Marker, Popup,GeoJSON,Circle,Tooltip } from 'react-leaflet'
import './App.css';
import data from './data/diplomacy.json'
import embassies from './data/embassies.json'
import travel from './data/travel_advisory.json'
import worldmap from './data/world_map.json'
import embassyhistorydata from './data/embassy_history.json'
import embassyfinancedata from './data/afghanistan_funds.json'
import ReactPlayer from 'react-player/youtube'
import { TwitterTimelineEmbed} from 'react-twitter-embed';
import Footer from './components/Footer';
import Header from './components/Header';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import allcountries from './data/all_countries.json'
import wildlife from './data/wildlife.json'
import wildlife_migration from './data/wildlife_migration.json'
import migration from './data/migration.json'
import tip from './data/tip.json'
import worldGeoJSON from 'geojson-world-map';

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAbOXMF2QD78gnzLRhd-XS-51Q_UIWR4h4',
  Promise: Promise
});

var myGoogleIcon = L.icon({
  iconUrl: './images/google_icon.png',
  iconSize: [25,41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
  });

var myIcon = L.icon({
iconUrl: './images/blue.png',
iconSize: [25,41],
iconAnchor: [12.5, 41],
popupAnchor: [0, -41]
});


var mySecondIcon = L.icon({
  iconUrl: './images/star.png',
  iconSize: [25,41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
  });

var circle = L.circle([51.508, -0.11], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 50
});

class App extends Component {

  state={
    location: {
    lat: 51.505,
    lng: -0.09,
    },
    diplomacy_data : [
      { key: 'Bi-Lateral', data: 20000 },
      { key: 'Multi-Lateral', data: 1000 }
    ],
    all_diplomacy_data:[
      
    ],
    zoom: 2,
    current_weather: 50,
    current_air:45,
    data:data,
    wildlifedata: wildlife,
    wildlifemigrationdata: wildlife_migration,
    migrationdata: migration,
    show_advisory: false,
    show_wildlife: false,
    show_tiplife:false,
    show_person: false,
    show_embassies: true,
    defaultActiveKey: 'home',
    show_aid: false,
    show_air: false,
    time_line: true,
    embassy_data: embassies,
    tip_data: tip,
    bilateral_amount: 2000,
    multilateral_amount: 200,
    travel_data: travel,
    world_map: worldmap,
    embassyhistory: embassyhistorydata,
    embassyhistorynotclosure: embassyhistorydata,
    travel_advisory: '',
    showLogOut: false,
    videoURL : '',
    aqi : '',
    haveUsersLocation: false,
    languagesearch: '',
    search: '',
    embassy_details: '',
    missions: '',
    value:1779,
    rangevalue:2009,
    financerangevalue: 2000,
    setValue: 1779,
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    userMessage: {
      message: ''
    }
  }

 

  componentDidMount(){

    
    this.timer = setInterval(() => {

      var counter = this.state.value;

      if(counter === 2020)
      {
        counter = 1789
      }
      this.setState({

        value:  parseInt(counter) + 1
      });

      

      var filter_history = embassyhistorydata.filter(function (pilot) {
        return parseInt(pilot.year) < parseInt(counter);
      });
  
      var filter_not_history = embassyhistorydata.filter(function (pilot) {
        return parseInt(pilot.year) < parseInt(counter) && pilot.event !== "closure" ;
      });
      //console.log(filter_history);
      this.setState({embassyhistorynotclosure: filter_not_history})
      this.setState({embassyhistory: filter_history});


    }, 1000);

    /*
    let promises=[];

    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    let filesPromise = Promise.resolve([]);
    filesPromise = Promise.all(this.state.embassy_data.map(data =>

      fetch(proxyUrl + 'https://api.waqi.info/feed/' + data.Country + '/?token=15e1bd345dd701c91b0b608289d134794cb0199c')
      .then(blob => blob.json())
      .then(data => {
        //this.setState({ current_air: data.data.aqi});

        const elementsIndex = this.state.embassy_data.findIndex(element => element.Country === data.Country )
        let newArray = [...this.state.embassy_data]
        var airQuality = 0;
        if(data.data.aqi !== 'undefined')
        {
          airQuality = data.data.aqi;
        }
        console.log(airQuality);
        newArray[elementsIndex] = {...newArray[elementsIndex], Air: airQuality}
        this.setState({
          embassy_data: newArray,
          });

       // console.log(data.data.aqi)
      })
      .catch(e => {
        console.log(e);
        
      })

    )).then((results) => {
      //console.log(results);
    });

    */

     var filter_history = allcountries.filter(function (pilot) {
      return parseInt(pilot.fiscal_year) === 2000;
    });
   
    var rows = [];
      for (var i = 0; i < filter_history.length; i++) {
        rows.push({"key": filter_history[i].country_name,
          "data" : parseInt(filter_history[i].current_amount)/100000});
      };
      //console.log(rows);
      this.setState({all_diplomacy_data: rows});

    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        haveUsersLocation: true,
        zoom: 2,

      });

    }, 
    () => {
    fetch('https://ipapi.co/json')
    .then(res => res.json())
    .then(location => {
      //console.log(location);
      this.setState({
        location: {
          lat: location.latitude,
          lng: location.longitude,
        },
        haveUsersLocation: true,
        zoom: 2,
      });
    })
      }
    );

    var filter_history = this.state.embassyhistory.filter(function (pilot) {
      return pilot.year === "1779";
    });
    console.log(filter_history);
    this.setState({embassyhistory: filter_history});

    var filter_not_history = embassyhistorydata.filter(function (pilot) {
      return parseInt(pilot.year) < 1780 && pilot.event != "closure" ;
    });
  
    this.setState({embassyhistorynotclosure: filter_not_history})

  }

  formSubmitted = (event) => {
    event.preventDefault();
    //console.log(this.state.userMessage)
  }

  resetSubmit = (event) => {
    event.preventDefault();
    var country = "USA";
    this.setState({missions: ''});
    this.setState({time_line: true});
    this.setState({embassy_details: ''});
    this.setState({embassy_data: embassies});
    googleMapsClient.geocode({address: country})
  .asPromise()
  .then((response) => {
    //console.log(response.json.results);
    this.setState({
      location: {
        lat: response.json.results[0].geometry.location.lat,
        lng: response.json.results[0].geometry.location.lng,
      },
      haveUsersLocation: true,
      zoom: 2,
    });

  })
  .catch((err) => {
    console.log(err);
  });
}

searchLanguageSubmit = (event) => {
  event.preventDefault();
  var language = this.state.languagesearch;
  //console.log(language);
  var filter_countries = embassies.filter(function (pilot) {
    return pilot.Languages.indexOf(language) !== -1;
    
  });

  //console.log(filter_countries)

  this.setState({embassy_data: filter_countries});

}


  searchSubmit = (event) => {
        event.preventDefault();
        this.setState({defaultActiveKey: 'home'})
        var country = this.state.search;
        var filter_countries = this.state.embassy_data.filter(function (pilot) {
          return pilot.Country === country;
        });
        this.setState({missions: filter_countries});
        this.setState({embassy_details: country});
        googleMapsClient.geocode({address: country})
      .asPromise()
      .then((response) => {
        //console.log(response.json.results);
        this.setState({
          location: {
            lat: response.json.results[0].geometry.location.lat,
            lng: response.json.results[0].geometry.location.lng,
          },
          haveUsersLocation: true,
          zoom: 5,
        });

        var weatherURL = 'api.openweathermap.org/data/2.5/weather?lat='+ response.json.results[0].geometry.location.lat +'&lon=' + response.json.results[0].geometry.location.lng + '&appid=d3242b32f1fb46174a7a8d02030c4cd7'
        //var airTargetUrl = 'http://www.airnowapi.org/aq/forecast/latLong/?format=json&latitude=' + response.json.results[0].geometry.location.lat + '&longitude=' + response.json.results[0].geometry.location.lng + '&distance=25&API_KEY=B2767498-59EE-4F9C-822F-EF64B6F09DC1';
        //var airTargetUrl = 'http://www.airnowapi.org/aq/forecast/latLong/?format=json&latitude=39.0509&longitude=-121.4453&distance=25&API_KEY=B2767498-59EE-4F9C-822F-EF64B6F09DC1';
        var airTargetUrl = 'https://api.waqi.info/feed/' + country + '/?token=15e1bd345dd701c91b0b608289d134794cb0199c';
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        //weatherURL = 'https://samples.openweathermap.org/data/2.5/weather?q=Kabul,Afghanistan&appid=439d4b804bc8187953eb36d2a8c26a02';
        fetch(proxyUrl + weatherURL)
        .then(blob => blob.json())
        .then(data => {
          this.setState({ current_weather: data.weather[0].main});
          //console.log(data.weather[0].main);
        })
        .catch(e => {
          console.log(e);
          
        });


        fetch(proxyUrl + airTargetUrl)
        .then(blob => blob.json())
        .then(data => {
          this.setState({ current_air: data.data.aqi});
          
        })
        .catch(e => {
          console.log(e);
          
        });



      })
      .catch((err) => {
        console.log(err);
      });
      //console.log(this.state.location.lat);


     
      
 
      //Get air condition at a particular geolocation
      /*
      fetch(proxyUrl + targetUrl)
    .then(blob => blob.json())
    .then(data => {
      console.log(data)
    })
    .catch(e => {
      console.log(e);
      
    });
      */

  }

  onAirChanged1  = (lat,lon) => {
    //Get weather at a particular geolocation
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
     targetUrl = 'http://www.airnowapi.org/aq/forecast/latLong/?format=json&latitude=' + lat + '&longitude=' + lon + '&distance=25&API_KEY=B2767498-59EE-4F9C-822F-EF64B6F09DC1';
    fetch(proxyUrl + targetUrl)
    .then(blob => blob.json())
    .then(data => {
      console.log(data)
    })
    .catch(e => {
      console.log(e);
      
    });
   this.setState({current_air: data});
    return data;
 }


  onWeatherChanged = (each) => {
     //Get weather at a particular geolocation
     //var weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=44.651572&lon=-63.575482&appid=d3242b32f1fb46174a7a8d02030c4cd7";
     var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
     weatherURL = 'https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=439d4b804bc8187953eb36d2a8c26a02'

     fetch(proxyUrl + weatherURL)
     .then(blob => blob.json())
     .then(data => {
      this.setState({ current_weather: data.weather.main});
     })
     .catch(e => {
       console.log(e);
       
     });
    this.setState({current_weather: data});
     return(  <Popup><br /> 
                  <img alt="pic" style={{width:"150px"}} src={each.Staff_Image} /><br/>
                  <a target='_blank' href='{each.Staff_Url}' ><b>{each.Staff_Name}</b></a><br/>
                  {each.Street_Address_1}<br /> 
                  {each.Property_Name}<br /> 
                  {each.Post}<br /> 
                  {each.Country} <br/>
                  <img alt="mission" style={{width:"150px"}} src={each.Image} /><br/>
                  Travel Advisory: <b>{each.Travel_Advisory}</b> <br/>
                  Funding:${each.Funding != null ? parseInt(each.Funding) : 'N/A'}<br/>
                  Current Weather:  {this.state.current_weather}<br/>
                  Current Air:
                </Popup>)

  }

  onChanged = (event) => {
    const{name, value } = event.target;
    //console.log(value);
    this.setState({search: value});

  }
  onLanguageChanged = (event) => {
    const{name, value } = event.target;
    //console.log(value);
    this.setState({languagesearch: value});

  }

  displayMap = () =>
  {
return <GeoJSON  key='my-geojson' data={this.state.world_map} />

  }

  getTipColor = (score) => {

                      var  style = {
                        fillColor: '#F28F3B',
                        weight: 2,
                        opacity: 1,
                        color: 'white',
                        dashArray: '3',
                        fillOpacity: 0.5
                    }
               
                  score = parseInt(score);
                    if(score === 1 )
                    {
                      style.fillColor = 'Green';
                    }
                    else if(score === 2)
                    {
                      style.fillColor = 'Yellow';
                    }
                    else if(score === 2.5)
                    {
                      style.fillColor = 'Orange';
                    }
                    else if(score === 3)
                    {
                      style.fillColor = 'Red';
                    }
                    else
                    {
                      style.fillColor = 'Blue';
                    }

            return style;
  }

  getWildColor = (score) => {

    score = parseInt(score);

    if(score === 3)
    {
      return 'Red';
    }
    else if(score === 4)
    {
      return 'Green';
    }
    else if(score === 5)
    {
      return 'Black';
    }
    else if(score === 6)
    {
      return 'Yellow';
    }
    else
    {
      return 'Orange';
    }
  }

  getAirRadius = (score) => {

    return score <= 50 ? 100000 : score > 50 && score <= 100 ? 200000 :
    score > 100 && score <= 150 ? 400000:
    score > 150 ? 800000 :
                      2000;
  }

  getAirColor = (score) => {

  return score <= 50 ? 'Green' : score > 50 && score <= 100 ? 'Yellow' :
    score > 100 && score <= 150 ? 'Orange' :
    score > 150 ? 'Red' :
                      'Green';
  }
  
  getAidRadius = (value) => {

    var radius = 800000;

    value = parseInt(value);
    if(value >= 1000000 && value < 100000000)
    {
      radius = 100000;
    }
    else if(value < 1000000)
    {
      radius = 10000;
    }
    return radius;
  }

  getAidCircle = (value) => 
  {

    var color = 'white';

  value = parseInt(value);

  if(value >= 100000000)
  {
    color = 'red'
  }
  else if(value >= 1000000 && value < 100000000)
  {
    color = 'black';
  }

  return color

  }


  getAirColorStyle = (score) => {
           
           var  style = {
                         fillColor: '#F28F3B',
                         weight: 3,
                         opacity: 1,
                         color: 'white',
                         dashArray: '3',
                         fillOpacity: 1
                     }
                   //console.log(score);
                   score = parseInt(score);
                     if(score <= 50 )
                     {
                       style.fillColor = 'Green';
                     }
                     else if(score > 50 && score <=150)
                     {
                       style.fillColor = 'Yellow';
                     }
                     else if(score > 150 && score <=300)
                     {
                       style.fillColor = 'Orange';
                     }
                     else
                     {
                       style.fillColor = 'Red';
                     }
 
             return style;
 }
 
 getDivIcon = (score) =>
 {

  score = parseInt(score);

  var greenIcon = L.divIcon({
    className : 'div-green-icon',
    html: '<span style="color: white; background-color: green; font-size: 14px;">' + score + '<img width="16px" src="/diploun/images/sunny.png"/></span>'
  })

  var yellowIcon = L.divIcon({
    className : 'div-yellow-icon',
    html: '<span style="color: black; background-color: yellow; font-size: 14px;">' + score + '<img width="16px" src="/diploun/images/cloudy.png"/></span>'
  })

  var orangeIcon = L.divIcon({
    className : 'div-orange-icon',
    html: '<span style="color: black; background-color: orange; font-size: 14px;">' + score + '<img width="16px" src="/diploun/images/pollution.png"/></span>'
  })

  var redIcon = L.divIcon({
    className : 'div-red-icon',
    html: '<span style="color: white; background-color: red; font-size: 14px;">' + score + '<img width="16px" src="/diploun/images/radioactive.png"/></span>'
  })

  var emptyIcon = L.divIcon({
    className : 'div-red-icon',
    html: '<span></span>'
  })


  return score > 0 && score <= 50 ? greenIcon : score > 50 && score <= 100 ? yellowIcon :
  score > 100 && score <= 150 ? orangeIcon :
  score > 150 ? redIcon :
  emptyIcon;

 }

  getColor = (score) => {


          
          var  style = {
                        fillColor: '#F28F3B',
                        weight: 2,
                        opacity: 1,
                        color: 'white',
                        dashArray: '3',
                        fillOpacity: 0.5
                    }
                  //console.log(score);
                  score = parseInt(score);
                    if(score <= 2 )
                    {
                      style.fillColor = 'Blue';
                    }
                    else if(score > 2 && score <=3)
                    {
                      style.fillColor = 'Yellow';
                    }
                    else if(score > 3 && score <=4)
                    {
                      style.fillColor = 'Orange';
                    }
                    else
                    {
                      style.fillColor = 'Red';
                    }

            return style;
}

  valueChanged = (event) => {
    const{name, value } = event.target;

      this.setState((prevState) => ({
        userMessage:{
          ...prevState.userMessage,
          [name]:value
        }
      }))
  }

  onFinanceValueChanged= (event) => {
    
    this.setState({financerangevalue: event.target.value});

    var filter_history = allcountries.filter(function (pilot) {
      return parseInt(pilot.fiscal_year) === parseInt(event.target.value);
    });

    var rows = [];
      for (var i = 0; i < filter_history.length; i++) {
        rows.push({"key": filter_history[i].country_name,
          "data" : parseInt(filter_history[i].current_amount)/100000});
      };

         this.setState({all_diplomacy_data: rows});
  }

  onRangeValueChanged= (event) => {
    
    this.setState({rangevalue: event.target.value});

    var filter_history = embassyfinancedata.filter(function (pilot) {
      return parseInt(pilot.Fiscal_Year) === parseInt(event.target.value) && pilot.Collaboration_Type == "Bilateral";
    });

    var filter_multi_history = embassyfinancedata.filter(function (pilot) {
      return parseInt(pilot.Fiscal_Year) === parseInt(event.target.value) && pilot.Collaboration_Type == "Multilateral";
    });

    //console.log(filter_multi_history.length);

    var total = 0;
    var multi_total = 0;

    total = filter_history.reduce(function (sum, tax) {
      return sum + parseInt(tax.Amount);
  }, 0);

  multi_total = filter_multi_history.reduce(function (sum, tax) {
    return sum + parseInt(tax.Amount);
}, 0);
 

    this.setState({bilateral_amount: total});
    this.setState({multilateral_amount: multi_total});

   var diplo_data = [
          { key: 'Bi-Lateral', data: total },
           { key: 'Multi-Lateral', data: multi_total }
         ]
        
         console.log(diplo_data);

         this.setState({diplomacy_data: diplo_data});

 
  }

  onValueChanged = (event) => {
    
    this.setState({value: event.target.value});
    var filter_history = embassyhistorydata.filter(function (pilot) {
      return parseInt(pilot.year) < parseInt(event.target.value);
    });

    var filter_not_history = embassyhistorydata.filter(function (pilot) {
      return parseInt(pilot.year) < parseInt(event.target.value) && pilot.event !== "closure" ;
    });
    //console.log(filter_history);
    this.setState({embassyhistorynotclosure: filter_not_history})
    this.setState({embassyhistory: filter_history});

  }

  onTravelChanged= (event) => {
   
    this.setState({show_advisory: event.target.checked});
  }
  onEmbassyChanged= (event) => {
   
    this.setState({show_embassies: event.target.checked});
  }


  onWildLifeChanged= (event) => {
   
    this.setState({show_wildlife: event.target.checked});
  }

  onTipLifeChanged= (event) => {
   
    this.setState({show_tiplife: event.target.checked});
  }

  onAidChanged = (event) => {
   
    this.setState({show_aid: event.target.checked});
  }

  onAirChanged = (event) => {
   
    this.setState({show_air: event.target.checked});
    this.setState({
      location: {
        lat: 8.500288,
        lng: 4.771983,
      },
      haveUsersLocation: true,
      zoom: 2,
    });
  }

  centerMap = (event) =>
  {
    this.setState({
      location: {
        lat: 8.500288,
        lng: 4.771983,
      },
      haveUsersLocation: true,
      zoom: 2,
    });
  }

  stopShow = (event) =>
  {
    clearTimeout(this.showcasetimer);
  }

  playShow = (event) =>
  {
    var counter = 1;
    this.showcasetimer = setInterval(() => {

      this.setState({

        show_advisory: false
      });
      this.setState({

        show_wildlife: false
      });

      this.setState({

        show_tiplife: false
      });

      this.setState({

        show_air: false
      });
      this.setState({

        show_aid: false
      });
      
      

      if(counter === 1)
      {
        this.setState({

          show_advisory: true
        });
      }
      else if(counter === 2)
      {

        this.setState({

          show_aid:  true
        });
      }
      else if(counter === 3)
      {
        this.setState({

          show_air:  true
        });
      }
      else if(counter === 4)
      {
        this.setState({

          show_wildlife: true
        });
      }
      else if(counter === 5)
      {
        this.setState({

          show_tiplife: true
        });
      }
      
      counter = counter + 1;
      if(counter > 5)
      {
        counter = 1;
      }

    }, 3000);

  }
  
  render(){
  let items = this.state.data
  //let embassy_items = this.state.embassy_data
  let map_items = this.state.world_map
  let map_wildlifedata = this.state.wildlifedata
  let map_migrationdata = this.state.migrationdata

  
  const position=[this.state.location.lat, this.state.location.lng]
  return (
   
    <div className="App">
  <Header>
    </Header>
    <Row>
    <Col sm={{ size: 3, offset: 1 }}>
    <h3>
      <img class="img-fluid" alt='state logo' src="./images/logo.png" />
      </h3>
    </Col>
    <Col sm={{ size: 6, offset: 1 }}>
    <div  style={{textAlign: 'center', padding: '25px'}}>
    <i><h4>The United States Department of State (DOS) has {this.state.embassy_data.length} Missions around thd World</h4></i>
    </div>
    </Col>
    </Row>
  
            <Form className="form"  onSubmit={this.formSubmitted}> 
                <Input className="input"  onChange={this.onChanged} type="text" name="search" id="search" placeholder="Type your Country..." />
                <Button onClick={this.searchSubmit} color="info" disabled={!this.state.haveUsersLocation}>Search</Button>       
                <Input className="input"  onChange={this.onLanguageChanged} type="text" name="languagesearch" id="languagesearch" placeholder="Type your Language..." />
                <Button onClick={this.searchLanguageSubmit} color="info" disabled={!this.state.haveUsersLocation}>Search</Button>     
                <Button onClick={this.resetSubmit} color="info" disabled={!this.state.haveUsersLocation}>Reset</Button> 
     
           </Form><br/>
        <Row>
        <Col sm={{ size: 12 }}>
        <span className="boxes"><Input  onChange={this.onEmbassyChanged} id="travel" checked={this.state.show_embassies} value="embassies" type="checkbox" />
                <label htmlFor="embassies">Show Embassies</label> </span>
             <span className="boxes"><Input  onChange={this.onTravelChanged} id="travel" checked={this.state.show_advisory} value="Travel" type="checkbox" />
                <label htmlFor="travel">Travel Advisory</label> </span>
                <span className="boxes"><Input onChange={this.onAidChanged} id="aid" value="Aid" checked={this.state.show_aid} type="checkbox"/> 
                <label for="aid">U.S. Aid</label></span> 
                 <span className="boxes"><Input onChange={this.onAirChanged} id="air" value="air" checked={this.state.show_air} type="checkbox"/> 
                 <label for="air">Air Quality</label></span> 
                 <span className="boxes"><Input  onChange={this.onWildLifeChanged} id="wildlife" value="Wild Life" checked={this.state.show_wildlife} type="checkbox" />
                <label htmlFor="wildlife">Trafficking in Wild Life</label> </span>
                <span className="boxes"><Input  onChange={this.onTipLifeChanged} id="tiplife" value="Tip" checked={this.state.show_tiplife} type="checkbox" />
                <label htmlFor="tiplife">Trafficking in Person</label> </span>

                <span className="boxes">
                <button type="button" onClick={this.centerMap}>
              <img width='25px' alt="center" src="./images/center.png"></img>
                </button>
                <button type="button" onClick={this.stopShow}>
              <img width='25px' alt="stop" src="./images/stop.jpg"></img>
                </button>
                <button type="button" onClick={this.playShow}>
              <img width='25px' alt="play" src="./images/play.png"></img>
                </button>
                </span>
            </Col></Row>

    
            <Row>
            {
          this.state.show_advisory ?
        <Col sm={{ size: 10, offset: 1 }}>
        <span style={{textAlign: 'center', padding: '5px'}}>
        <div className="map-box">
            Level 1: Exercise Normal Precautions[Blue]
            Level 2: Exercise Increased Caution[Yellow] 
            Level 3: Reconsider Travel[Orange] 
            Level 4: Do Not Travel[Red] 
            </div>
        </span>
        </Col> : ''
            }
            </Row>
            <Row>
            {
              this.state.show_aid ?
        <Col sm={{ size: 10, offset: 1 }}>
        <span style={{textAlign: 'center', padding: '5px'}}>
        <div className="map-box">
            <i>Countries receiving over 100 Million Dollars in Aid </i></div></span>

        </Col>  : ''
            }
        </Row>
            <Row>

{
this.state.show_tiplife ?
<Col sm={{ size: 10, offset: 1  }}>
<span style={{textAlign: 'center', padding: '5px'}}>
<div className="map-box">
<h2><i>
<span style={{color:'green', marginLeft: '10px;'}}>Tier 1</span>
<span style={{color:'yellow', marginLeft: '10px;'}}>Tier 2</span>   
<span style={{color:'orange', marginLeft: '10px;'}}>Tier 3</span>   
<span style={{color:'red', marginLeft: '10px;'}}>Tier 4</span>   
<span style={{color:'blue', marginLeft: '10px;'}}>Special Cases</span></i></h2>
</div></span>
</Col> : ''
}

</Row>
 
<Row>
            {
      this.state.show_air ?
   
      <span style={{textAlign: 'center', padding: '5px'}}>
      <div className="map-box">
      <h3><i>
      <Col sm={{ size: 2 }}>
      <span style={{color:'green', marginLeft: '10px;'}}>Healthy</span>
      </Col>
      <Col sm={{ size: 2}}>
<span style={{color:'yellow', marginLeft: '10px;'}}>Moderate</span>  
</Col> 
<Col sm={{ size: 2}}>
<span style={{color:'orange', marginLeft: '10px;'}}>Very Unhealthy</span>   
</Col>
<Col sm={{ size: 2  }}>
<span style={{color:'red', marginLeft: '10px;'}}>Hazardous</span>  
</Col>
</i></h3>  </div> </span>
         : ''

            }
</Row>
<Row>
          {
          this.state.show_wildlife ? 
          <Col sm={{ size: 10, offset: 1  }}>
          <span style={{textAlign: 'center', padding: '5px'}}>
            <div className="map-box">
            Red: Rosewood 
            Green:  Elephant Tasks
            Black: Rhino Horns 
            Orange: Reptiles
            </div> </span>
          </Col> : ''
          }
</Row>

     <Row>
     <Col sm={{ size: 7, offset: 1 }}>
 
      <Map id="map" className="map" center={position} zoom={this.state.zoom}>
        <TileLayer noWrap="true"
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {

          this.state.show_wildlife ? 
      
          map_wildlifedata.map((each, index) => {

        return <GeoJSON  key={index} data={each} style={this.getColor(each.score)} />
          }) 
          : ''
        }

             {

              this.state.show_wildlife ? 

              this.state.wildlifemigrationdata.map((each, index) => {
              return <GeoJSON key={index} data={each} style={{color: this.getWildColor(each.score)}} />
              }) 
              : ''
              }
        
      {
          this.state.show_tiplife ?
          
          
        this.state.tip_data.map((each, index) => {

         return <GeoJSON  key={index} data={each} style={this.getTipColor(each.score)} />
        }) 

        : ''
        }
  
        {
          this.state.show_advisory ?
          
        map_items.map((each, index) => {

         return <GeoJSON  key={index} data={each} style={this.getColor(each.score)} />
        }) 

        : ''
        }

        {
          this.state.show_air ?
          this.state.embassy_data.map((each, index) => {
          if (isNaN(each.Longitude) === false && isNaN(each.Latitude) === false) {
        var position=[each.Latitude, each.Longitude]
        return <Marker key={index} position={position}  icon={this.getDivIcon(each.Air)}>
      </Marker>
      }}): ''
        }

        {this.state.show_embassies ?

           this.state.embassy_data.map((each, index) => {
        //console.log(each.Longitude)
        if (isNaN(each.Longitude) === false && isNaN(each.Latitude) === false) {
        var position=[each.Latitude, each.Longitude]
        return <Marker key={index} position={position}  icon={parseInt(each.Air) > 180 ? myIcon : myIcon}>
              <Popup><br /> 
                  <img alt="pic" style={{width:"150px"}} src={each.Staff_Image} /><br/>
                  <a target='_blank' href='{each.Staff_Url}' ><b>{each.Staff_Name}</b></a><br/>
                  {each.Street_Address_1}<br /> 
                  {each.Property_Name}<br /> 
                  {each.Post}<br /> 
                  {each.Country} <br/>
                  <img alt="mission" style={{width:"150px"}} src={each.Image} /><br/>
                  Travel Advisory: <b>{each.Travel_Advisory}</b> <br/>
                  Funding:${each.Funding != null ? parseInt(each.Funding) : 'N/A'}<br/>
                  Current Weather:  {this.state.current_weather}<br/>
                  Current Air: {this.state.current_air} 
                </Popup>
{
  this.state.show_aid ?
        <Circle 
                  center={{lat:each.Latitude, lng: each.Longitude}}
                  fillColor={this.getAidCircle(each.Funding)} 
                  radius={this.getAidRadius(each.Funding)}><Tooltip>{each.Country + ':' + each.Funding}</Tooltip></Circle> : ''
}


        </Marker> 
        }
      })
          
        : ''}
  
      </Map>
      </Col>
      
      <Col sm={{ size: 4}}>

<div>

  <Tabs defaultActiveKey={'timeline'} id="main-page">
<Tab eventKey="slideshow" title="Slide Show">
<div className="slide-container">
     <Zoom scale={0.4}>
       {
         items.map((each, index) => 
         (
         <div key={index} className="each-slide">
         <span  className="text-padding">{each.Event} - <b>{each.Date}</b></span>
           <a href="#"  onClick={() => this.setState({showLogOut: true, videoURL: each.Video})}>
            <img alt={index} key={index} style={{width: "100%", height: "300px", padding: "20px", alignContent: "center"}} src={each.Images} />
         </a>
         </div>
      
         )
         )
       }
     </Zoom>
   </div>
</Tab>
<Tab eventKey="timeline" title="Timeline">
<Row>
<Map id="map_history" className="map_history" center={position} zoom={1}>
     <TileLayer 
       attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> devs'
       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
     />
     {        
       
       this.state.embassyhistory.map((each, index) =>  {
           
     if (isNaN(each.lon) === false && isNaN(each.lat) === false) {
     var position=[each.lat, each.lon]
     return <Marker key={index} position={position} icon={myIcon}>
          <Popup><br /> 
          {each.event} in {each.country}<br />  
                
          </Popup>
         <Circle 
               center={{lat:each.lat, lng: each.lon}}
               fillColor="black" 
               radius={parseInt(each.funding)}/>
        </Marker> 
     }
   })
 }

   </Map>
   </Row>
   <Row>
   <br/>
   <RangeSlider min={1777} max={2020}
   value={this.state.value} step={1}
   onChange={this.onValueChanged}
 />
   <br/>
   <span><b><i>{this.state.value} - Number of Embassies {this.state.embassyhistorynotclosure.length}</i></b></span>
   </Row>
</Tab>
</Tabs>
 

   
<Modal isOpen={this.state.showLogOut}  toggle={() => this.setState({showLogOut: false})}>
<ModalHeader toggle={() => this.setState({showLogOut: false})}>Play Video</ModalHeader>
 <ModalBody >    
     <ReactPlayer width="400px"  url={this.state.videoURL} />                  
 </ModalBody>
<ModalFooter>

 <Button onClick={() => this.setState({showLogOut: false})}>Close</Button>

</ModalFooter>
</Modal>
</div>
</Col>
     
      </Row>
   <Row>
   <Col sm={{ size: 8, offset: 1}}>

   <Tabs defaultActiveKey="allcountries" id="tab-mission">
   <Tab eventKey="allcountries" title="U.S. Aid by Countries">
<BarChart width={1000} height={250} data={this.state.all_diplomacy_data} />
<br/>
<br/>
   <RangeSlider min={2000} max={2020}
   value={this.state.financerangevalue} step={1}
   onChange={this.onFinanceValueChanged}/>
   <br/><b>{this.state.financerangevalue}</b>

</Tab>
<Tab disabled={this.state.missions === '' } eventKey="home" title="Mission">
{
  this.state.missions !== '' ? 
 this.state.missions.map((each, index) => 
     
     <Row className="embassy">
     <Col sm={{ size: 2}}>
     <img alt={'staff'} style={{width:"150px"}} src={each.Staff_Image} /><br/>
     {each.Staff_Name}<br/>
     <hr/>
     </Col>
     
     <Col sm={{ size: 3}}>
     <div style={{color:'Black', background:'White', border:'1px', borderRadius: '5px', borderColor: 'Brown', fontSize: '16px', textAlign: 'center'}}>
       <span style={{color:'Brown'}}>{each.Property_Name}</span><br/>
       <img alt={'Chancery'} style={{width:"150px"}} src={each.Image} /><br/>
       {each.Street_Address_1} <br/>
       {each.Street_Address_3} <br/>
       {each.Post},  {each.Country} <br/>
       {each.Hours}
       <br/>
       <hr/>
     </div>
     
     </Col>

     <Col sm={{ size: 4}}>
      {each.Notes}
       </Col>
     
     </Row>

   ) : ''
}
</Tab>

<Tab disabled={this.state.missions === '' } eventKey="usaid" title="Diplomacy">
<BarChart width={350} height={250} data={this.state.diplomacy_data} />
<br/>
   <RangeSlider min={2010} max={2020}
   value={this.state.rangevalue} step={1}
   onChange={this.onRangeValueChanged}/>
   <br/><b>{this.state.rangevalue}</b>
   <br/>Bi-lateral Dollars:<b>${this.state.bilateral_amount}</b>
   <br/>Multilateral Dollars:<b>${this.state.multilateral_amount}</b>
</Tab>
</Tabs>

   </Col>
   <Col xs="2"  className="twitter-sizing">
       <TwitterTimelineEmbed
sourceType="profile"
screenName="statedept"
options={{height: 400}}
/>
       </Col>
   </Row>
   <Footer>
    </Footer>
    </div>
  );  
  }
}

export default App;
