import React from 'react';
import { StyleSheet, Text, View, PermissionsAndroid, Button } from 'react-native';
import FetchLocation from './components/FetchLocation';

import Geolocation from 'react-native-geolocation-service';
import UsersMap from './components/UsersMap';


export default class App extends React.Component {
  state = {
    userLocation: null,
    usersPlaces: []
  }

  getUserLocationHandler = () => {
    Geolocation.getCurrentPosition(position => {
      this.setState({
        userLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
      });
      fetch('https://localhost:44343/Locations', {
        method: 'POST',
        body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    }, err => console.log(err));
  }

  getUserPlacesHandler = () => {
    fetch('https://localhost:44343/Locations')
    .then(res => res.json())
    .then(parsedRes => {
      const placesArray = [];
      for (const key in parsedRes) {
          placesArray.push({
          latitude: parsedRes[key].latitude,
          longitude: parsedRes[key].longitude,
          id: key
        });
      }
      this.setState({
        usersPlaces: placesArray
      });
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>COVID-19 Contact Tracking</Text>
        <View style={{marginBottom: 20}}>
          <Button  title="Get Contact Locations" onPress={this.getUserPlacesHandler}/>
        </View>
        <FetchLocation onGetLocation={this.getUserLocationHandler} />
        <UsersMap userLocation={this.state.userLocation} usersPlaces={this.state.usersPlaces} />
      </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });