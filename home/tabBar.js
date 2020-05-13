//This is an example code for the Custom Header//
import React, { Component } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import {setCurrentTab} from '../../constant/actions/user'
//import react in our code
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Alert, BackHandler, ImageBackground, Dimensions } from 'react-native';

class tabBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
        }
    }

    handleBackButton = () => {
        if (this.props.navigation.isFocused()) {
            Alert.alert(
                "Exit App",
                "Do you want to exit?",
                [
                    {
                        text: "No",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "Yes", onPress: () => BackHandler.exitApp() }
                ],
                { cancelable: false }
            );
            return true;
        }
    }


    async componentDidMount() {       
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
       
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    onTabSelect =(rute,selectedTab)=>{
        this.props.navigation.navigate(rute);
        this.props.dispatch(setCurrentTab(selectedTab));
    }

    render() {
        return (
            this.props.bottomTabShow==3?
            <View style={{ height: 50}}>
             <Spinner color="#0D838E" visible={this.props.isloading} />

                <View style={{ flex: 1, flexDirection: "row" }}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => this.onTabSelect("Orderpage",1)} >
                        <View style={{ flex: 1, backgroundColor:this.props.selectedTab==1? "#0a6169":"#0D838E", justifyContent: "center", alignItems: "center" }}>
                            <ImageBackground source={require("../../assets/images/order.png")}  style={{ width:20, height:20,marginHorizontal:5 }} />
                            <Text style={{color:"#fff"}} >Orders</Text>
                        </View>
                    </TouchableOpacity>
            
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => this.onTabSelect("Profile",2)} >
                        <View style={{ flex: 1, backgroundColor:this.props.selectedTab==2? "#0a6169":"#0D838E", justifyContent: "center", alignItems: "center" }}>
                            <ImageBackground source={require("../../assets/images/Profile.png")} style={{ width:20, height:20,marginHorizontal:5 }} />
                            <Text style={{color:"#fff"}}>Profile</Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: 1 }} onPress={() => this.onTabSelect("Settings",3)} >
                        <View style={{ flex: 1, backgroundColor:this.props.selectedTab==3? "#0a6169":"#0D838E", justifyContent: "center", alignItems: "center" }}>
                            <ImageBackground source={require("../../assets/images/Settings.png")} style={{ width:20, height:20,marginHorizontal:5 }} />
                            <Text style={{color:"#fff"}}>Settings</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>:
            <View/>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedTab: state.User.selectedTab?state.User.selectedTab:1,
    bottomTabShow:state.User.bottomTabShow?state.User.bottomTabShow:3,
    isloading: state.User.isloading?state.User.isloading:false
});

export default connect(mapStateToProps)(tabBar);
