//This is an example code for the Custom Header//
import React, { Component } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, BackHandler, Dimensions, TextInput } from 'react-native';
import { login, forgoutPass } from '../../constant/actions/user';
import Api from '../../lib/api';
import { ShowToast } from '../../constant/function';

var { width } = Dimensions.get('window');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            email: "",
            password: "",
            actionis: false
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            header: (
                <View style={styles.headerView}>
                </View>
            ),
        };
    };

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

    emailValidate = (email) => {
        return email.indexOf("@") > 0 ? email.indexOf(".") > 0 ? false : true : true;
    }

    handleLogin = () => {
        if (this.state.actionis) {
            let error = false;
            if (this.emailValidate(this.state.email)) { error = true; ShowToast("please enter a valid email id", 3, 5000) }
            if (!error) {
                let data = { "Email": this.state.email }
                this.props.dispatch(forgoutPass(data))
            }
        }
        else {
            let token = Api.device_token;
            let error = false;
            if (this.emailValidate(this.state.email)) { error = true; ShowToast("please enter a valid email id", 3, 5000) }
            if (this.state.password == "" && !error) { error = true; ShowToast("Password required", 3, 5000) }
            if (!error) {
                let data = {
                    "DeviceType": "Android", "DeviceId": "911578251454107",
                    "DeviceToken": token,
                    "Email": this.state.email,
                    "Password": this.state.password
                }
                this.props.dispatch(login(data))
            }
        }

    }

    forgotPass = () => {
        this.setState({
            actionis: true, email: "",
            password: "",
        });
    }

    async componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    render() {
        return (
            <>
                {this.state.actionis && <TouchableOpacity style={{ top: 20, left: 20, position: "absolute" }} onPress={() => this.setState({ actionis: false, email: "", password: "" })} >
                    <Image style={{ height: 20, width: 20 }} source={require("../../assets/images/backarrowcolor.png")} />
                </TouchableOpacity>}
                <View style={styles.container}>
                    <Spinner color="#0D838E" visible={this.props.isloading} />
                    <Image style={styles.logoImage} source={require("../../assets/images/Logo.png")} resizeMode='contain' />

                    <View style={styles.viewTxtField}>
                        <TextInput style={styles.input}
                            placeholder="Enter Email Here"
                            autoCapitalize="none"
                            value={this.state.email}
                            onChangeText={(email) => this.setState({ email })}
                        />

                        {!this.state.actionis && <TextInput style={styles.input}
                            placeholder="Password"
                            autoCapitalize="none"
                            secureTextEntry={true}
                            value={this.state.password}
                            onChangeText={(password) => this.setState({ password })}
                        />}

                        {!this.state.actionis && <TouchableOpacity
                            style={styles.forgotButton}
                            onPress={() => this.forgotPass()}
                        >
                            <Text style={{ color: "#0C8390" }}> Forgot Password ? </Text>
                        </TouchableOpacity>}

                        <TouchableOpacity
                            style={[styles.submitButton, { marginTop: this.state.actionis ? 60 : 0 }]}
                            onPress={
                                () => this.handleLogin()
                            }
                        >
                            <Text style={styles.submitButtonText}> {this.state.actionis ? "SUBMIT" : "LOGIN"} </Text>
                        </TouchableOpacity>
                    </View>
                    <Image style={styles.bottomImg} source={require("../../assets/images/Login_Image.png")} resizeMode='stretch' />
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerView: {
        height: 0,
        marginTop: 0,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
    },
    logoImage: {
        marginTop: "10%"
    },
    bottomImg: {
        width: "100%"
    },
    input: {
        width: width - 40,
        marginTop: 20,
        height: 40,
        borderBottomColor: '#0C8390',
        borderBottomWidth: 1
    },
    viewTxtField: {
        marginTop: 40
    },
    forgotButton: {
        alignSelf: 'flex-end',
        marginVertical: 10
    },
    submitButton: {
        backgroundColor: '#0C8390',
        padding: 10,
        margin: 30,
        width: 200,
        height: 40,
        alignSelf: 'center'
    },
    submitButtonText: {
        color: 'white',
        alignSelf: 'center'
    }
})

const mapStateToProps = (state) => ({
    isloading: state.User.isloading ? state.User.isloading : false

});

export default connect(mapStateToProps)(Login);
