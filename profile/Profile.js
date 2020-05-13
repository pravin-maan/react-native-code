//This is an example code for the Custom Header//
import React, { Component } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
//import react in our code
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, BackHandler, Dimensions, TextInput, Platform, Keyboard } from 'react-native';
//import all the components we are going to use.
import { isloading, updateProfile, setCurrentTab, bottomTabShow, getOrders, setCurrentUser } from '../../constant/actions/user';
import Header from '../header/Header';
import { CommonColor, ShowToast } from '../../constant/function';
var { height, width } = Dimensions.get('window');
import AsyncStorage from '@react-native-community/async-storage';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataupdate: true,
            visible: true,
            userData: {}
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            header: <Header title={"Profile"} showBack={"Order"} />
        }
    };


    validateNumber = (data) => { return /^().{10,10}$/.test(data) ? true : false; };
    updateProfile = () => {
        if (this.validateNumber(this.state.userData.Mobile)) {
            this.props.dispatch(updateProfile({ DriverId: this.state.userData.Id, FirstName: this.state.userData.FirstName, Mobile: this.state.userData.Mobile }))
        }
        else {
            ShowToast("Enter a valid phone number", 3, 5000);
        }
    }

    orderClick = () => {

        let data = { "DriverId": this.props.userData.Id }
        this.props.dispatch(getOrders(data));
        this.props.dispatch(setCurrentTab(1))
    }


    async componentDidMount() {
        if (Platform.OS === "android") {
            Keyboard.addListener('keyboardDidShow', this.visible(2));
            Keyboard.addListener('keyboardDidHide', this.visible(3));
        }
    }
    visible = visible => () => this.props.dispatch(bottomTabShow(visible));

    componentWillUnmount() {
        this.keyboardEventListeners && this.keyboardEventListeners.forEach((eventListener) => eventListener.remove());
    }

    render() {

        return (
            <View style={[styles.container]}>
                <View style={{ marginTop: 20, marginHorizontal: 16 }}>
                    <Text> NAME </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput style={styles.input}
                            placeholder="Name Here"
                            value={this.state.userData.FirstName}
                            onChangeText={() => this.setState({})}
                            editable={false}
                        />
                    </View>
                    <View style={{ marginHorizontal: 5, height: 2, backgroundColor: '#0C8390' }} />
                </View>

                <View style={{ marginTop: 20, marginHorizontal: 16 }}>
                    <Text> EMAIL ADDRESS </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput style={styles.input}
                            placeholder="Email Here"
                            value={this.state.userData.Email}
                            editable={false}
                            onChangeText={() => this.setState({})}
                        />
                    </View>
                    <View style={{ marginHorizontal: 5, height: 2, backgroundColor: '#0C8390' }} />
                </View>
                <View style={{ marginTop: 20, marginHorizontal: 16 }}>
                    <Text> PHONE NUMBER </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput style={styles.input}
                            placeholder="Number Here"
                            value={String(this.state.userData.Mobile)}
                            keyboardType="numeric"
                            onChangeText={(Mobile) => this.setState({ userData: { ...this.state.userData, Mobile } })}
                        />
                        <Image style={{ height: 25, width: 25, marginRight: 10 }} source={require("../../assets/images/edit.png")} resizeMode='center' />
                    </View>
                    <View style={{ marginHorizontal: 5, height: 2, backgroundColor: '#0C8390' }} />
                </View>

                <TouchableOpacity style={{ marginTop: 40, marginHorizontal: 16 }} onPress={() => this.orderClick()} >
                    <Text style={{}}> ORDERS </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ marginTop: 40, marginHorizontal: 16 }}
                    onPress={async () => {
                        Alert.alert(
                            "Logout",
                            "Do you want to logout?",
                            [
                                {
                                    text: "No",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                },
                                {
                                    text: "Yes", onPress: async () => {
                                        await AsyncStorage.removeItem("User");
                                        this.props.dispatch(setCurrentUser({}));
                                        this.props.dispatch(setCurrentTab(1));
                                        this.setState({ userData: {}, dataupdate: true }, () => this.props.navigation.navigate("Login"));
                                    }
                                }
                            ],
                            { cancelable: false }
                        );
                        return true;
                    }
                    }
                >
                    <Text style={{ color: CommonColor.themecolor }}> LOGOUT </Text>
                </TouchableOpacity>

                <View style={{ justifyContent: "flex-end", flex: 1 }}>
                    <TouchableOpacity style={{ marginVertical: 15, justifyContent: "flex-end", alignItems: "center" }} onPress={() => this.updateProfile()} >
                        <Text style={{ backgroundColor: CommonColor.themecolor, paddingHorizontal: 50, paddingVertical: 8, color: "#ffff", fontSize: 20, alignSelf: "center" }}>{"SUBMIT"}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return (!prevState.userData.Id ? { userData: nextProps.userData, dataupdate: false } : { prevState });
    }






}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        width: width - 77,
        marginTop: 10,
        height: 40,
    },
    imageMenu: {
        height: 25,
        width: 25,
        marginLeft: 16
    }
})

const mapStateToProps = (state) => ({
    userData: state.User.userData ? state.User.userData : {}

});

export default connect(mapStateToProps)(Profile);
