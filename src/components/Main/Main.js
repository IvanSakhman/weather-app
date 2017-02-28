import React from 'react';
import Datamap from 'datamaps/dist/datamaps.ukr';
import d3 from 'd3';
import { ItemsContainer } from '../ItemsContainer/ItemsContainer'

import styles from './Main.scss';


class Main extends React.Component {
    state = {
        city: [
            "L'viv",
            "Donets'k",
            "Vinnytsia",
            "Dnipropetrovsk",
            "Ivano-Frankivs'k",
            "Zhytomyr",
            "Kiev",
            "Kirovohrad",
            "Luhans'k",
            "Luts'k",
            "Mykolaiv",
            "Odessa",
            "Poltava",
            "Rivne",
            "Sumy",
            "Ternopil",
            "Uzhhorod",
            "Kharkiv",
            "Kherson",
            "Khmelnytskyi",
            "Cherkasy",
            "Chernivtsi",
            "Chernihiv",
            "Zaporizhia",
            "Simferopol"
        ]
    };
    componentDidMount = () => {
        document.addEventListener("DOMContentLoaded", this.handleMap)
    };
    componentWillUnmount = () => {
        document.removeEventListener("DOMContentLoaded", this.handleMap)
    };
    handleMap = () => {
        const ukrMap = new Datamap({
            scope: 'ukr',
            height: 1000,
            element: document.getElementById('map'),
            geographyConfig: {
                popupTemplate: function(geography, data) {
                    const city = localStorage.getItem(geography.id);
                    const someData = {
                        temp: JSON.parse(city).data.current_observation.temp_c,
                        icon: JSON.parse(city).data.current_observation.icon_url,
                        observation_time: JSON.parse(city).data.current_observation.observation_time,
                        windDir:  JSON.parse(city).data.current_observation.wind_dir,
                        windKph:  JSON.parse(city).data.current_observation.wind_kph,
                        pressureMb:  JSON.parse(city).data.current_observation.pressure_mb,
                        windChill: JSON.parse(city).data.current_observation.windchill_string
                    };
                    return (
                        `<div class="hoverinfo"><h3>${geography.id}</h3><p>Temperature: ${someData.temp} &#8451;</p><img src=${someData.icon} alt="weather"/><p>Observation Time: ${someData.observation_time}</p><p>Wind Direction: ${someData.windDir}</p><p>Kilometers Per Hour: ${someData.windKph} </p><p>Pressure Bar: ${someData.pressureMb} </p><p>Wind Chill: ${someData.windChill} </p></div>`
                    );
                },
            },
            setProjection: (element) => {
                const projection = d3.geo.mercator()
                    .center([12.560077144500099, 41.287229413500036])
                    .rotate([0, 0])
                    .scale(6144.37545703623 / 1.5)
                    .translate([-500, 1200]);
                const path = d3.geo.path()
                    .projection(projection);
                return {path: path, projection: projection};
            },
        });
        ukrMap.labels();
    };
    render() {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}> Weather App</h1>
                <ItemsContainer city={this.state.city} />
                <div id="map"></div>
            </div>
        )
    }
}

export default Main;