import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Image,
  Switch
} from 'react-native'
import ToggleSwitch from 'toggle-switch-react-native'
import { SearchBar } from 'react-native-elements'
import topBar from '../images/center-logo2x.png'
import customer from '../icons/customer.svg'
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  CheckBox,
  Button,
  Icon
} from 'react-native-elements'
import axios from 'axios'

let geolocationCoordinates = []


export default class BathRoomForm extends Component<{}> {
  constructor() {
    super()

    this.state = {
        location_name: 'anson',
        latitude: 69,
        longitude: 69,
        over_21: false,
        handicapped: false,
        family: false,
        customer_only: false,
        trueSwitchIsOn: true,
        falseSwitchIsOn: false
    }
  }

  static navigationOptions = {
    headerStyle: {
      position: 'absolute',
      top: 0,
      left: 0
    },
    headerBackTitleStyle: {
        opacity: 0,
    },
    headerTintColor: '#fff'
  };



  updateLocationName(locationName) {
    console.log(this.state.location_name)
    this.setState({ location_name: locationName  });
  }

  updateAddress(address) {
    this.setState({ address: address  });
  }

  toggleOver21() {
    if (this.state.over_21 === false) {
      this.setState({ over_21: true })
    } else {
      this.setState({ over_21: false })
    }
  }

  toggleHandicapped() {
    if (this.state.handicapped === false) {
      this.setState({ handicapped: true })
    } else {
      this.setState({ handicapped: false })
    }
  }

  toggleFamily() {
    if (this.state.family === false) {
      this.setState({ family: true })
    } else {
      this.setState({ family: false })
    }
  }

  toggleCustomerOnly() {
    if (this.state.customer_only === false) {
      this.setState({ customer_only: true })
    } else {
      this.setState({ customer_only: false })
    }
  }

  geolocateAddress(address) {
    // console.log('making request to google')
    var self = this

    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDvzsWpabMDZzoKw5hpo5RODzQhqzE4dhg&address=${address}`)
    .then(response => {
      return geolocationLat = response.data.results[0].geometry.location.lat
      return geolocationLng = response.data.results[0].geometry.location.lng

      // console.log('printing state after setting it:')
      // console.log(this.state)
      // return geolocationCoordinates = [geolocationLat, geolocationLng]
    });
    self.setState({
      latitude: geolocationLat,
      longitude: geolocationLng
    })
  }

  addBathroom(bathroomData) {
    // console.log('printing bathroomData:')
    // console.log(bathroomData)
    this.geolocateAddress('dev bootcamp sf')

    console.log('printing state after calling geolocateAddress:')
    console.log(this.state)

    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.post('http://localhost:3000/bathrooms/',  bathroomData
      // location_name: bathroomData.location_name,
      // latitude: geolocationCoordinates[0],
      // longitude: geolocationCoordinates[1],
      // over_21: bathroomData.over_21,
      // handicapped: bathroomData.handicapped,
      // family: bathroomData.family,
      // customer_only: bathroomData.customer_only
    )
    .then(response => {
      // console.log('printing google API response:')
      // console.log(geolocationCoordinates)
      // console.log('printing backend response:')
      // console.log(response)
    });
  }


  render() {
    return (


      <View style={styles.container}>
        <Image
          source={topBar}
          style={styles.topBar}
        />
        <ScrollView>
        <View style={styles.headDiv}>
          <Text style={styles.header}>
            Tell us about this bathroom
          </Text>
        </View>
        <View style={styles.input}>
          <FormLabel>Business Name</FormLabel>
          <FormInput onChangeText={(locationName) => this.updateLocationName(locationName)}/>
        </View>
        <View style={styles.input}>
          <FormLabel>Address</FormLabel>
          <FormInput onChangeText={(address) => this.updateAddress(address)}/>
        </View>
        <View style={styles.toggle}>
          <Icon
            name='local-bar'
            color='#7a8288'
          />
          <ToggleSwitch
             isOn={false}
             onColor='#3d2d75'
             offColor='grey'
             label='Age restrictions 21+'
             labelStyle={{color: '#7a8288', fontWeight: '900'}}
             size='small'
             onToggle={ (isOn) => console.log('changed to : ', isOn) }
          />
        </View>

        <View style={styles.toggle}>
          <Icon
            name='attach-money'
            color='#7a8288'
          />
          <ToggleSwitch
             isOn={false}
             onColor='#3d2d75'
             offColor='grey'
             label='Customer only'
             labelStyle={{color: '#7a8288', fontWeight: '900'}}
             size='small'
             onToggle={ (isOn) => console.log('changed to : ', isOn) }
          />
        </View>

       <View style={styles.divider}>
          <Text style={styles.divideText}>
            AMENITIES
          </Text>
        </View>

        <View style={styles.toggle}>
          <Icon
            name='accessible'
            color='#7a8288'
          />

          <ToggleSwitch
             isOn={false}
             onColor='#3d2d75'
             offColor='grey'
             label='Handicap accessible'
             labelStyle={{color: '#7a8288', fontWeight: '900'}}
             size='small'
             alignItems='flex-end'
             onToggle={ (isOn) => console.log('changed to : ', isOn) }
          />
        </View>

        <View style={styles.toggle}>
          <Icon
            name='child-friendly'
            color='#7a8288'
          />
          <ToggleSwitch
             isOn={false}
             onColor='#3d2d75'
             offColor='grey'
             label='changing table'
             labelStyle={{color: '#7a8288', fontWeight: '900'}}
             size='small'
             onToggle={ (isOn) => console.log('changed to : ', isOn) }
          />
        </View>

        <View style={styles.toggle}>
          <Icon
            name='torsos-all'
            type='foundation'
            color='#7a8288'
          />
          <ToggleSwitch
             isOn={false}
             onColor='#3d2d75'
             offColor='grey'
             paddingLeft='10'
             label='Family'
             labelStyle={{color: '#7a8288', fontWeight: '900'}}
             size='small'
             onToggle={ (isOn) => console.log('changed to : ', isOn) }
          />
        </View>
        <View style={styles.buttonDiv}>
          <Button
            backgroundColor= '#007fff'
            borderRadius= {4}
            fontFamily= 'verdana'
            fontWeight= 'bold'
            raised
            title='Submit Bathroom'
            onPress={() => this.submitReview(this.state)}
          />
        </View>



      </ScrollView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  headDiv: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'lightgrey',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgrey'
  },
  header: {
    fontWeight: 'bold',
    fontSize: 22,
    fontFamily: 'verdana'
  },
  divider: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'lightgrey',
    height: 60,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderColor: 'lightgrey'
  },
  divideText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'verdana',
    color: '#7a8288'
  },
  topBar: {
    height: 67,
    width: 375,
  },
  checkBox: {
    padding: 30
  },
  icon: {

  },

  toggle: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 5,
    fontFamily: 'verdana',
    fontSize: 16,
    lineHeight: 1.38,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'lightgrey'
  },
  buttonDiv: {
    backgroundColor: 'lightgrey',
    padding: 20,
    color: '#007fff'
  },
  button: {
    backgroundColor: '#007fff',

  }
});
