//This is an example code for the Custom Header//
import React, { Component } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import EmptyData from '../../screen/Common/EmptyData';
import Header from '../header/Header';
import SafetyCheckBool from '../Common/safetyCheckBool';
import { CommonColor, ShowToast } from '../../constant/function';
import {setSafetyCurrentPage,setSafety} from '../../constant/actions/user';
import AsyncStorage from '@react-native-community/async-storage';


class SafetyPage1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            currentPage: 1,
            confirmShow: false,
            startPoint: 0,
            endPoint: 0,
            CurrentQuestion: [],
            confirm: true,
            allQuestion:[]
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            header:props => <Header {...props} title={"Safety Checks"} focusWindow={"safetypage1"} showBack={"Home"}/>
        }
    };

    async componentDidMount() {
    }

    componentWillUnmount() {
    }

    getQuestion = () => {
        let { endPoint, startPoint, currentPage,confirmShow} = this.state
        let orgArraylength = this.state.allQuestion.length;

        startPoint = ((currentPage - 1) * 3);
        endPoint = startPoint + 3 <= orgArraylength ? startPoint + 3 : orgArraylength;
        let CurrentQuestion = this.state.allQuestion.slice(startPoint, endPoint);

        if (currentPage * 3 >= orgArraylength) {
            !confirmShow?this.setState({ confirmShow: true }):null
            return CurrentQuestion
        }
        else {
            confirmShow?this.setState({confirmShow: false }):null;
            return CurrentQuestion
        }

    }

    inputChange = (obj) => {

        let CurrentQuestion = this.state.allQuestion;
        const index = CurrentQuestion.findIndex(fruit => fruit.SafetyCheckId === obj.SafetyCheckId);
        CurrentQuestion[index] = { ...CurrentQuestion[index], Value: obj.Value,description:obj.popupValue?obj.popupValue:""}
        this.setState({allQuestion:CurrentQuestion},()=>this.getQuestion());
    }

    nextPageclick = () => {
        let { endPoint, startPoint, currentPage,confirmShow} = this.state
        let orgArraylength = this.state.allQuestion.length;
         startPoint = ((currentPage - 1) * 3);
         endPoint = startPoint + 3 <= orgArraylength ? startPoint + 3 : orgArraylength;
        let CurrentQuestion = this.state.allQuestion.slice(startPoint, endPoint);
        let error = false;
        CurrentQuestion.map((e,i)=>{if(e.Value==""&&!error){
            error=true;
            ShowToast(e.CheckName+" is require",3,5000)
        }});

        !error?this.props.dispatch(setSafetyCurrentPage(this.state.currentPage + 1)):null
    }

    onsafetySubmit =async ()=>{
        let {allQuestion } = this.state;
        let data=[];
        allQuestion.map((e,i)=>data.push({"SafetyCheckId":e.SafetyCheckId,"Value":e.Value,"description":e.description?e.description:"","DriverId":this.props.userData.Id}));
        this.props.dispatch(setSafety({"data":{Safety:data},navTo:this.props.userData.SafetyCheckStatus?"Home":"Home"}));
        this.props.dispatch(setSafetyCurrentPage(1))
        
    }

    render() {
        return (
            <View style={{ flex: 1, top: 10 }}>
                <Spinner color="#0D838E" visible={this.props.isloading} />
                <ScrollView style={{ flex: 1, paddingHorizontal: 15, top: 10 }}>
                    {this.state.currentPage == 1 && <View style={{ flexDirection: "row", backgroundColor: CommonColor.themecolor, padding: 15 }}>
                        <View style={{ flex: .2, alignItems: "center" }}>
                            <Image style={{ width: 30, height: 30, marginRight: 15 }} source={require("../../assets/images/Warning.png")} />
                        </View>
                        <View style={{ flex: .8 }}>
                            <Text style={{ color: "#fff", fontSize: 14 }} >Lorem ipsum dolor sit amet consectet</Text>
                            <Text style={{ color: "#fff", fontSize: 14 }} >adipiscing elit. Aenean commodo ligula</Text>
                            <Text style={{ color: "#fff", fontSize: 14 }} >eget dolor. Aenean massa. Cum sociis</Text>
                            <Text style={{ color: "#fff", fontSize: 14 }} >natoque penatibus et magnis dis quam</Text>
                            <Text style={{ color: "#fff", fontSize: 14 }} >parturient montes nasce ridiculus mus.</Text>
                            <Text style={{ color: "#fff", fontSize: 14 }} >Donec quam felis ultricies nec.</Text>
                        </View>
                    </View>}
                    {this.getQuestion().map((e, i) => <SafetyCheckBool element={e} onInputChang={this.inputChange} />)}

                </ScrollView>
                {!this.state.confirmShow && <View style={{ flexDirection: "row", marginHorizontal: 15, justifyContent: "flex-end", marginVertical: 25 }}>
                    <TouchableOpacity onPress={() => this.nextPageclick()}>
                        <Text style={{ color: CommonColor.themecolor, fontWeight: 'bold', fontSize: 17, alignSelf: "flex-end", justifyContent: "flex-end" }} >Next</Text>
                    </TouchableOpacity>
                </View>}

                {this.state.confirmShow &&

                    <View style={{ marginHorizontal: 15, marginVertical: 25 }}>
                        <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => this.setState({ confirm: !this.state.confirm })}>
                            <Image style={{ width: 30, height: 30, marginRight: 15 }} source={this.state.confirm ? require("../../assets/images/Checkd-in.png") : require("../../assets/images/Checkd-Box.png")} />
                            <View>
                                <Text style={{ fontSize: 14 }} >Please confirm all above answers are</Text>
                                <Text style={{ fontSize: 14 }} >correct.</Text>
                            </View>
                        </TouchableOpacity>

                        <View>
                            <TouchableOpacity style={{ marginVertical: 15 }} disabled={!this.state.confirm} onPress={()=>this.onsafetySubmit()} >
                                <Text style={{ backgroundColor:!this.state.confirm?CommonColor.textgrey:CommonColor.themecolor, paddingHorizontal: 30, paddingVertical: 10, color: "#ffff", fontSize: 20, alignSelf: "flex-end" }}>CONTINUE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                }


            </View>
        )
    }

    componentDidMount(){
        this.getQuestion();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.getSafetycheck&& !prevState.allQuestion[0]){
            return ({ allQuestion:nextProps.getSafetycheck});
        } 
        if(nextProps.setSafetyCurrentPage!=prevState.currentPage){
            return({currentPage:nextProps.setSafetyCurrentPage});
        }
        return prevState;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 16,
        marginTop: 5
    },
    detailText: {
        fontSize: 13,
        fontWeight: 'normal',
        marginHorizontal: 16,
        marginTop: 1,
        marginBottom: 1,
        color: 'grey'
    },
    imageArrow: {
        height: 20,
        width: 20,
        marginTop: 10,
        marginLeft: 8
    },
    imageMenu: {
        height: 25,
        width: 25,
        marginLeft: 16
    },
    button: {
        alignItems: 'center',
        padding: 10
    },
})

const mapStateToProps = (state) => ({
    getSafetycheck :state.User.getSafetycheck? state.User.getSafetycheck:[],
    userData: state.User.userData?state.User.userData:false,
    setSafetyCurrentPage:state.User.setSafetyCurrentPage?state.User.setSafetyCurrentPage:1,
    isloading: state.User.isloading?state.User.isloading:false

});

export default connect(mapStateToProps)(SafetyPage1);
