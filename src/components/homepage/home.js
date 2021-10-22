// import MapGL, { Source, Layer } from "@urbica/react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {useState} from 'react'
import statesData from '../cooridnates/states-cooridnates'
import React from 'react';
import { FormFile } from "react-bootstrap";
import ReactMapGL, {Source, Layer, NavigationControl} from 'react-map-gl';
import { GeolocateControl, Marker, clusterMarker } from "react-map-gl"



export default function Home(props) {
  var GeoJSON = require('geojson');
  props.setShowBack(true)
    let newGeojson;
    // let name = props.options.selectedItems;
    var array = new Array();
    let moreData = {};
    let data = {};
    data = {
      type: 'FeatureCollection',
      features: []
   }
    for(let j = 0; j < props.options.selectedItems.length; j++){
        for(let i = 0; i < 52; i++){
          if(props.options.selectedItems[j] === statesData.features[i].properties['name']) {
            if(props.options.selectedItems.length > 1){       
              if(statesData.features[i].geometry['type'] === 'Polygon'){
                GeoJSON.parse(statesData.features[i].geometry, {'Point': ['x', 'y'], 'LineString': 'line', 'Polygon': 'polygon'}, function(geojson2) {
                moreData[j] = {
                    type: 'Feature',
                    geometry: {
                      type: 'Polygon',
                      coordinates: geojson2['properties']['coordinates']
                    }}
                    data['features'].push(moreData[j])
                });
              }
              else if(statesData.features[i].geometry['type'] === 'MultiPolygon'){
                GeoJSON.parse(statesData.features[i].geometry, {'Point': ['x', 'y'], 'LineString': 'line', 'MultiPolygon': 'multipolygon'}, function(geojson2) {
                  moreData[j] = {
                    type: 'Feature',
                    geometry: {
                      type: 'MultiPolygon',
                      coordinates: geojson2['properties']['coordinates']
                    }}
                    data['features'].push(moreData[j])
                });
              }
            } 
          else{
            if(props.options.selectedItems[0] === statesData.features[i].properties['name']) {
              if(statesData.features[i].geometry['type'] === 'Polygon'){GeoJSON.parse(statesData.features[i].geometry, {'Point': ['x', 'y'], 'LineString': 'line', 'Polygon': 'polygon'}, function(geojson) {
                data = {
                  type: 'FeatureCollection',
                  features: [{
                    type: 'Feature',
                    geometry: {
                      type: 'Polygon',
                      coordinates: geojson['properties']['coordinates']
                    }
                  }]
              }
            });} 
            else if(statesData.features[i].geometry['type'] === 'MultiPolygon'){
              GeoJSON.parse(statesData.features[i].geometry, {'Point': ['x', 'y'], 'LineString': 'line', 'MultiPolygon': 'multipolygon'}, function(geojson) {
                data = {
                  type: 'FeatureCollection',
                  features: [{
                    type: 'Feature',
                    geometry: {
                      type: 'MultiPolygon',
                      coordinates: geojson['properties']['coordinates']
                    }
                  }]
              }
              });
            }
          }
          }
        }
      }
    }
    const geolocateStyle = {
      padding: '20px',
    };
       
    
  const [viewport, setViewport] = useState({
    longitude: -105.41,
    latitude: 39.77,
    width: '100vw',
    height: '100vh',
    zoom: 4,
  });

  
 
 
  const MAPBOX_TOKEN="pk.eyJ1IjoicmljaGF0ZW5hbnkiLCJhIjoiY2t1MnZxN3pmMjF5MzJ1dGhqdDY0NjNneiJ9.i7PsTt47B7Ahrr3b43LF7g"
  const navControlStyle= {
    right: 10,
    top: 10
  };
  return (
    <ReactMapGL
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/light-v9"
      mapboxApiAccessToken={MAPBOX_TOKEN}
      onViewportChange={setViewport}
      {...viewport}
    >
       <NavigationControl style={navControlStyle} />
      <GeolocateControl
      style={geolocateStyle}
      positionOptions={{enableHighAccuracy: true}}
      trackUserLocation={true}
      position="top-left"
      label="Current Location"
      zoom="10"
      />
      <Source id="maine" type="geojson" data={data} />
      <Layer
        id="maine"
        type="fill"
        source="maine"
        paint={{
          "fill-color": "red",
          "fill-opacity": 0.5,
        }}
      />
      
    </ReactMapGL>
  );
}