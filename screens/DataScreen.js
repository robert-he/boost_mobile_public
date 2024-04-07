import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { LineChart } from 'react-native-chart-kit';
import Modal from 'react-native-modal';
import NavBar from '../components/NavBar';
import MapPopup from '../components/MapPopup';

const width = Dimensions.get('window').width;

class DataScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedTimeframe: 'ALL',
      selectedAddress: null,
    };
  }

  // renders the top switch bar between all time, last 30 days, and last 7 days
  renderTopButtons = () => {
    const options = ['ALL', '30 DAYS', '7 DAYS'];

    return options.map((timeframe, index) => {
      return (
        <TouchableHighlight
          key={index}
          style={
            this.state.selectedTimeframe === timeframe ? styles.selectedBox : styles.selectorBox
          }
          onPress={() => {
            this.setState({
              selectedTimeframe: timeframe,
            });
          }}>
          <Text style={styles.text}>{timeframe}</Text>
        </TouchableHighlight>
      );
    });
  };

  // displays most productive day in top box (pulls from redux store)
  getMostProductiveDay = () => {
    if (this.state.selectedTimeframe === '7 DAYS') {
      if (
        !this.props.mostProductiveDays.mostProductiveWeekDayLast7Days ||
        this.props.mostProductiveDays.mostProductiveWeekDayLast7Days === 'Not enough information'
      ) {
        return (
          <Text
            style={
              styles.badLocationsData
            }>{`Uh oh! Looks like we don't have enough data for you in the last ${
            this.state.selectedTimeframe.split(' ')[0]
          } days.`}</Text>
        );
      } else {
        return (
          <Text style={styles.cardText}>{`${
            this.props.mostProductiveDays.mostProductiveWeekDayLast7Days
          }s`}</Text>
        );
      }
    } else if (this.state.selectedTimeframe === '30 DAYS') {
      if (
        !this.props.mostProductiveDays.mostProductiveWeekDayLast30Days ||
        this.props.mostProductiveDays.mostProductiveWeekDayLast30Days === 'Not enough information'
      ) {
        return (
          <Text
            style={
              styles.badLocationsData
            }>{`Uh oh! Looks like we don't have enough data for you in the last ${
            this.state.selectedTimeframe.split(' ')[0]
          } days.`}</Text>
        );
      } else {
        return (
          <Text style={styles.cardText}>{`${
            this.props.mostProductiveDays.mostProductiveWeekDayLast30Days
          }s`}</Text>
        );
      }
    } else {
      if (
        !this.props.mostProductiveDays.mostProductiveWeekDayAllTime ||
        this.props.mostProductiveDays.mostProductiveWeekDayAllTime === 'Not enough information'
      ) {
        return (
          <Text
            style={
              styles.badLocationsData
            }>{`Uh oh! Looks like we don't have enough data for you.`}</Text>
        );
      } else {
        return (
          <Text style={styles.cardText}>{`${
            this.props.mostProductiveDays.mostProductiveWeekDayAllTime
          }s`}</Text>
        );
      }
    }
  };

  // displays least productive day in top box (pulls from redux store)
  getLeastProductiveDay = () => {
    if (this.state.selectedTimeframe === '7 DAYS') {
      if (
        !this.props.leastProductiveDays.leastProductiveWeekDayLast7Days ||
        this.props.leastProductiveDays.leastProductiveWeekDayLast7Days === 'Not enough information'
      ) {
        return (
          <Text
            style={
              styles.badLocationsData
            }>{`Uh oh! Looks like we don't have enough data for you in the last ${
            this.state.selectedTimeframe.split(' ')[0]
          } days.`}</Text>
        );
      } else {
        return (
          <Text style={styles.cardText}>{`${
            this.props.leastProductiveDays.leastProductiveWeekDayLast7Days
          }s`}</Text>
        );
      }
    } else if (this.state.selectedTimeframe === '30 DAYS') {
      if (
        !this.props.leastProductiveDays.leastProductiveWeekDayLast30Days ||
        this.props.leastProductiveDays.leastProductiveWeekDayLast30Days === 'Not enough information'
      ) {
        return (
          <Text
            style={
              styles.badLocationsData
            }>{`Uh oh! Looks like we don't have enough data for you in the last ${
            this.state.selectedTimeframe.split(' ')[0]
          } days.`}</Text>
        );
      } else {
        return (
          <Text style={styles.cardText}>{`${
            this.props.leastProductiveDays.leastProductiveWeekDayLast30Days
          }s`}</Text>
        );
      }
    } else {
      if (
        !this.props.leastProductiveDays.leastProductiveWeekDayAllTime ||
        this.props.leastProductiveDays.leastProductiveWeekDayAllTime === 'Not enough information'
      ) {
        return (
          <Text
            style={
              styles.badLocationsData
            }>{`Uh oh! Looks like we don't have enough data for you.`}</Text>
        );
      } else {
        return (
          <Text style={styles.cardText}>{`${
            this.props.leastProductiveDays.leastProductiveWeekDayAllTime
          }s`}</Text>
        );
      }
    }
  };

  // display most frequently visited locations to user
  renderMostProductiveLocations = () => {
    let locations = [];

    this.props.mostProductiveLocations.forEach(obj => {
      if (
        (obj.days === '7' && this.state.selectedTimeframe === '7 DAYS') ||
        (obj.days === '30' && this.state.selectedTimeframe === '30 DAYS') ||
        (parseInt(obj.days, 10) > 30 && this.state.selectedTimeframe === 'ALL')
      ) {
        locations = obj.output;
      }
    });

    if (locations.length > 0) {
      return locations.map(location => {
        return (
          <TouchableOpacity
            onPress={() => {
              this.setState({ selectedAddress: location.address });
            }}>
            <Text style={styles.topLocation}>{location.address}</Text>
          </TouchableOpacity>
        );
      });
    } else if (this.state.selectedTimeframe === 'ALL') {
      return (
        <Text
          style={
            styles.badLocationsData
          }>{`Uh oh! Looks like we don't have enough data for you.`}</Text>
      );
    } else {
      return (
        <Text
          style={
            styles.badLocationsData
          }>{`Uh oh! Looks like we don't have enough data for you in the last ${
          this.state.selectedTimeframe.split(' ')[0]
        } days.`}</Text>
      );
    }
  };

  // display the chart mapping average productivity levels over last 7 or 30 days
  renderChart = () => {
    // reject if all
    if (this.state.selectedTimeframe === 'ALL') {
      return (
        <Text style={styles.badLocationsData}>
          Please select 7 or 30 days to view a chart of your average productivity levels over that
          period of time.
        </Text>
      );
    }

    let data = {};

    // pull data
    if (this.state.selectedTimeframe === '7 DAYS' && this.props.productivityScores['7']) {
      data = this.props.productivityScores['7'];
    } else if (this.state.selectedTimeframe === '30 DAYS' && this.props.productivityScores['30']) {
      data = this.props.productivityScores['30'];
    }

    // as long as there's enough data
    if (Object.keys(data).length === 0) {
      return (
        <Text
          style={
            styles.badLocationsData
          }>{`Uh oh! Looks like we don't have enough data for you in the last ${
          this.state.selectedTimeframe.split(' ')[0]
        } days.`}</Text>
      );
    }

    const values = [];

    // grab values
    Object.keys(data).forEach(value => {
      values.push(data[value]);
    });

    // render line chart
    return (
      <LineChart
        data={{
          labels: [],
          datasets: [
            {
              data: values,
            },
          ],
        }}
        width={Dimensions.get('window').width - 80} // from react-native
        height={300}
        chartConfig={{
          backgroundColor: '#586368',
          backgroundGradientFrom: '#586368',
          backgroundGradientTo: '#586368',
          color: (opacity = 1) => `rgba(255, 255, 255, 1)`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <NavBar backgroundColor="#293C44" />
          <View style={styles.getStartedContainer} contentContainerStyle={styles.contentContainer}>
            {this.renderTopButtons()}
          </View>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.insideScroll}>
              <Text style={styles.header}>Key Insights</Text>

              <View style={styles.card}>
                <Text style={styles.cardHeaderText}>YOU ARE MOST PRODUCTIVE ON</Text>
                {this.getMostProductiveDay()}
              </View>

              <View style={styles.card}>
                <Text style={styles.cardHeaderText}>YOU ARE LEAST PRODUCTIVE ON</Text>
                {this.getLeastProductiveDay()}
              </View>

              <Text style={styles.header}>Aggregate Productivity</Text>

              <View style={styles.card}>
                <View style={styles.chartArea} pointerEvents="none">
                  {this.renderChart()}
                </View>
              </View>

              <Text style={styles.header}>Most Productive Locations</Text>

              <View style={styles.card}>
                <View style={styles.topLocationArea}>{this.renderMostProductiveLocations()}</View>
              </View>
            </View>
          </ScrollView>
          <Modal
            isVisible={this.state.selectedAddress !== null}
            onBackdropPress={this.closeModal}
            onSwipeComplete={this.closeModal}
            animationIn="zoomIn"
            animationInTiming={400}
            animationOut="fadeOut">
            <MapPopup address={this.state.selectedAddress} />
          </Modal>
        </View>
      </SafeAreaView>
    );
  }

  closeModal = () => {
    this.setState({
      selectedAddress: null,
    });
  };
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#293C44',
  },
  container: {
    flex: 1,
    backgroundColor: '#293C44',
  },
  getStartedContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 18,
    marginRight: 18,
  },
  contentContainer: {
    backgroundColor: '#293C44',
  },
  selectorBox: {
    padding: 18,
    borderWidth: 1,
    borderColor: 'lightgrey',
    width: 3 * (width / 10),
  },
  selectedBox: {
    backgroundColor: '#1A262B',
    padding: 18,
    borderWidth: 1,
    borderColor: 'lightgrey',
    width: 3 * (width / 10),
  },
  text: {
    fontFamily: 'Raleway-Light',
    fontSize: 21,
    color: 'white',
    textAlign: 'center',
  },
  insideScroll: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#586368',
    borderRadius: 5,
    overflow: 'hidden',
    margin: 20,
    width: 350,
    height: 300,
  },
  header: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Raleway-SemiBold',
  },
  cardHeaderText: {
    fontFamily: 'Raleway-Light',
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    paddingTop: 50,
    marginHorizontal: 20,
  },
  cardText: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 45,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
    marginHorizontal: 20,
  },
  topLocation: {
    fontFamily: 'Raleway-Light',
    textDecorationLine: 'underline',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
  },
  topLocationArea: {
    margin: 20,
  },
  badLocationsData: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  chartArea: {
    marginVertical: 20,
  },
});

const mapStateToProps = state => {
  return {
    userData: state.user.userData,
    mostProductiveDays: state.user.mostProductiveDays,
    leastProductiveDays: state.user.leastProductiveDays,
    mostProductiveLocations: state.user.mostProductiveLocations,
    productivityScores: state.user.productivityScores,
  };
};

export default connect(
  mapStateToProps,
  null
)(DataScreen);
