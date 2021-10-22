import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import ReactMapGL, {Source, Layer, NavigationControl} from 'react-map-gl';
import { Select } from 'antd';
import {Redirect} from 'react-router-dom';
import OPTIONS from './options'
import Home from './home'
import history from '../../history'
import './dropdown.css'
import { Tabs, Radio } from "antd";
import './dropdown.css'
const { TabPane } = Tabs;
// const OPTIONS = ['Alabama', 'Alaska', 'Arizona', 'Arkansas'];

export default function Dropdown (props) {
    const [selectedItems, setSelectedItems] = useState([])


  const handleChange = (selectedItems) => {
    setSelectedItems(selectedItems)
    props.setOptions({selectedItems})
    props.setShowBack(false)
  };

  const [viewport, setViewport] = useState({
    longitude: -105.41,
    latitude: 39.77,
    width: '100vw',
    height: '100vh',
    zoom: 5,
  });


    // const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));
    let filteredOptions = OPTIONS.filter(function(o) {
        console.log(typeof(selectedItems))
        return !selectedItems.includes(o)
    })
    const navControlStyle= {
      right: 10,
      top: 10
    };
    const MAPBOX_TOKEN="pk.eyJ1IjoicmljaGF0ZW5hbnkiLCJhIjoiY2t1MnZxN3pmMjF5MzJ1dGhqdDY0NjNneiJ9.i7PsTt47B7Ahrr3b43LF7g"
    return (
      <ReactMapGL
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/light-v9"
      mapboxApiAccessToken={MAPBOX_TOKEN}
      onViewportChange={setViewport}
      {...viewport}
    >
      <NavigationControl style={navControlStyle} />
      <div className="body">
    <div className="inside">  
    <p className="label">  Please select your regions </p>
    <Tabs defaultActiveKey="1" type="card" className="tabs">
          <TabPane tab="State" key="1" className="color" >
          <Select
            mode="multiple"
            placeholder="Please choose your states"
            value={selectedItems}
            onChange={handleChange}
            // style={{ width: '100%' }}
            className="bar"
          > 
            {filteredOptions.map(item => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
        </Select>
        <button className="btn" onClick={() => history.push('/checking')}> Submit </button>

          </TabPane>
          <TabPane tab="County" key="2">
          <Select
            mode="multiple"
            placeholder="Please choose your county"
            value={selectedItems}
            onChange={handleChange}
            // style={{ width: '100%' }}
            className="bar"
          > 
            {filteredOptions.map(item => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
        </Select>
        <button className="btn" onClick={() => history.push('/checking')}> Submit </button>
          </TabPane>
        </Tabs>
   
  </div>
  </div>
      
    </ReactMapGL>
      
     
      
      
    );
}
