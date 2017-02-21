import React from 'react';
import styles from './Item.scss';
import axios from 'axios';

class Item extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        document.addEventListener("DOMContentLoaded", this.loadData)
    };

    componentWillUnmount = () => {
        document.removeEventListener("DOMContentLoaded", this.loadData)
    };

    state = {
        info: this.props,
        weather: ''
    };

    loadData = () => {
        const self = this;
        const city = this.state.info.city;
        const hours = 24;
        const now = new Date().getTime();
        const setupTime = localStorage.getItem(`${city}-setupTime`);
        if (setupTime == null) {
            localStorage.setItem(`${city}-setupTime`, now);
            axios.get(`http://api.wunderground.com/api/9240ffcab30bf9f5/conditions/q/Ukraine/${this.state.info.city}.json`)
                .then(function (response) {
                    console.group(city);
                    console.log(response);
                    console.groupEnd();
                    localStorage.setItem(city, JSON.stringify(response));
                    self.setState({
                        weather: {
                            temp: JSON.parse(localStorage.getItem(city)).data.current_observation.temp_c,
                            icon: JSON.parse(localStorage.getItem(city)).data.current_observation.icon_url,
                            observation_time: JSON.parse(localStorage.getItem(city)).data.current_observation.observation_time,
                            windDir:  JSON.parse(localStorage.getItem(city)).data.current_observation.wind_dir,
                            windKph:  JSON.parse(localStorage.getItem(city)).data.current_observation.wind_kph,
                            pressureMb:  JSON.parse(localStorage.getItem(city)).data.current_observation.pressure_mb,
                            windChill: JSON.parse(localStorage.getItem(city)).data.current_observation.windchill_string

                        }
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            if( now - setupTime > hours * 60 * 60 * 1000 ) {
                localStorage.clear();
                localStorage.setItem(`${city}-setupTime`, now);
                axios.get(`http://api.wunderground.com/api/9240ffcab30bf9f5/conditions/q/Ukraine/${this.state.info.city}.json`)
                    .then(function (response) {
                        console.group(city);
                        console.log(response);
                        console.groupEnd();
                        localStorage.setItem(city, JSON.stringify(response));
                        self.setState({
                            weather: {
                                temp: JSON.parse(localStorage.getItem(city)).data.current_observation.temp_c,
                                icon: JSON.parse(localStorage.getItem(city)).data.current_observation.icon_url,
                                observation_time: JSON.parse(localStorage.getItem(city)).data.current_observation.observation_time,
                                windDir:  JSON.parse(localStorage.getItem(city)).data.current_observation.wind_dir,
                                windKph:  JSON.parse(localStorage.getItem(city)).data.current_observation.wind_kph,
                                pressureMb:  JSON.parse(localStorage.getItem(city)).data.current_observation.pressure_mb,
                                windChill: JSON.parse(localStorage.getItem(city)).data.current_observation.windchill_string
                            }
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
        if (localStorage.getItem(city)) {
            this.setState({
                weather: {
                    temp: JSON.parse(localStorage.getItem(city)).data.current_observation.temp_c,
                    icon: JSON.parse(localStorage.getItem(city)).data.current_observation.icon_url,
                    observation_time: JSON.parse(localStorage.getItem(city)).data.current_observation.observation_time,
                    windDir:  JSON.parse(localStorage.getItem(city)).data.current_observation.wind_dir,
                    windKph:  JSON.parse(localStorage.getItem(city)).data.current_observation.wind_kph,
                    pressureMb:  JSON.parse(localStorage.getItem(city)).data.current_observation.pressure_mb,
                    windChill: JSON.parse(localStorage.getItem(city)).data.current_observation.windchill_string
                }
            });
        }
    };
    render() {
        return (
            <div className={styles.item}>
                <h3 className={styles.cityName}>{this.state.info.city}</h3>
                <p className={styles.temp} >Temperature: {this.state.weather.temp} &#8451;</p>
                <a href={`#${this.state.info.city}`}>
                    <img src={this.state.weather.icon} alt="weather"/>
                </a>
                <div id={this.state.info.city} className={styles.modal}>
                    <div className={styles.modalContent}>
                        <a href="#page"><span className={styles.close}>&times;</span></a>
                        <p>Observation Time: {this.state.weather.observation_time}</p>
                        <p>Wind Direction: {this.state.weather.windDir}</p>
                        <p>Kilometers Per Hour: {this.state.weather.windKph} </p>
                        <p>Pressure Bar: {this.state.weather.pressureMb} </p>
                        <p>Wind Chill: {this.state.weather.windChill} </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Item;