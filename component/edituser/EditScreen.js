import React from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	ScrollView,
	View,
	Text,
	TextInput,
	Button,
	TouchableOpacity,
	DeviceEventEmitter
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import ModalBox from "react-native-modalbox"
import Toast from 'react-native-root-toast'
export default class EditScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: "",
			loaded: false,
			assessToken: "",
			avatarSource: "",
			ModalToggle: false
		}
	}
	componentDidMount = () => {
		let assessToken = this.props.navigation.state.params.assessToken
		this.fetchData(assessToken)
		this.setState({
			assessToken: assessToken
		})
	};
	fetchData(assessToken) {
		//查询用户详细信息
		const uri = "http://192.168.1.100:3000/users/findUserByToken?assessToken=" + assessToken
		fetch(uri)
			.then((response) => response.json())
			.then((responseJson) => {
				if (responseJson.success) {
					this.setState({
						loaded: true,
						data: responseJson.user
					})
				} else {
					Toast.show("加载失败！请重试")
				}
			})
			.catch(error => {
				Toast.show("加载失败！请重试")
				console.log(error)
			})
	}
	linkUpdateScreen = () => {
		const { navigation } = this.props;
		let data = {
			title: "修改昵称",
			nickName: this.state.data.nickName,
			assessToken: this.state.assessToken,

		}
		navigation.navigate('UpdateScreen', data)
	}
	_openModal = () => {
		//打开模态框
		this.setState({
			ModalToggle: true
		})
	}
	//从相册选择图片
	_openImagePicker = () => {
		var assessToken = this.state.assessToken
		var _that = this
		ImagePicker.openPicker({
			width: 300,
			height: 400,
			cropping: true
		}).then(image => {

			let url = "http://192.168.1.100:3000/users/setAvatar"
			let formData = new FormData()
			let file = {
				uri: image.path,
				type: 'multipart/form-data',
				name: 'image.png'
			}
			formData.append('assessToken', assessToken)
			formData.append('file', file) // 有可能是file 也有可能是images 看后台的配置
			fetch(url, {
				method: 'POST',
				// headers: {
				// 	'Content-Type': 'application/x-www-form-urlencoded',
				// 	//"x-access-token": assessToken,
				// },
				body: formData
			})
			.then((response) => response.json())
			.then((responseData)=> {
				console.log(responseData);
				//修改成功
				_that.setState({
					avatarSource:responseData.avatarUrl
				})
				
			 })
			 .catch((err)=> {
				Toast.show("设置头像失败!")
				console.log('err', err);
			 });
		});
	}
	_openCamera = () => {

	}
	render() {
		if (!this.state.loaded) {
			return this.loadingView()
		}
		const { navigation } = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.photo}>
						<TouchableOpacity style={{ flex: 1, }} onPress={this._openModal}>

						</TouchableOpacity>
					</View>
					<Text style={styles.headerTip}>点击更换头像</Text>
				</View>
				<View style={styles.content}>
					<View style={styles.row}>
						<Text style={styles.label}>昵称</Text>
						<TouchableOpacity
							style={styles.EditButton}
							onPress={this.linkUpdateScreen}>
							<Text style={styles.EditText}>{this.state.data.nickName}</Text>
							<Icon name={'ios-arrow-forward'} style={styles.arrows} size={16} />
						</TouchableOpacity>
					</View>
					<View style={styles.row}>
						<Text style={styles.label}>简介</Text>
						<TouchableOpacity
							style={styles.EditButton}
							onPress={
								() => navigation.navigate("IntroScreen", { intro: this.state.data.intro, assessToken: this.state.assessToken })
							}>
							<Text style={styles.EditText}>{this.state.data.intro}</Text>
							<Icon name={'ios-arrow-forward'} style={styles.arrows} size={22} />
						</TouchableOpacity>
					</View>
					<View style={styles.row}>
						<Text style={styles.label}>性别</Text>
						<TouchableOpacity
							style={styles.EditButton}
							onPress={this.linkEditHome}>
							<Text style={styles.EditText}>{this.state.data.sex}</Text>
							<Icon name={'ios-arrow-forward'} style={styles.arrows} size={22} />
						</TouchableOpacity>
					</View>
					<View style={styles.row}>
						<Text style={styles.label}>生日</Text>
						<TouchableOpacity
							style={styles.EditButton}
							onPress={this.linkEditHome}>
							<Text style={styles.EditText}>{this.state.data.birthday}</Text>
							<Icon name={'ios-arrow-forward'} style={styles.arrows} size={22} />
						</TouchableOpacity>
					</View>
				</View>
				<ModalBox
					position="center"
					isOpen={this.state.ModalToggle}
					backdropPressToClose={true}
					style={{ backgroundColor: 'transparent', flex: 1, justifyContent: 'center', alignItems: 'center', width: "100%" }}
				>
					<View style={styles.modalContent}>
						<View style={styles.modalHeader}>
							<Text style={styles.modalTitle}>选择头像</Text>
						</View>
						<View style={styles.modalBody}>
							<TouchableOpacity style={styles.inputGroup} onPress={this._openCamera}>
								<Text style={styles.inputText}>拍照</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.inputGroup} onPress={this._openImagePicker}>
								<Text style={styles.inputText}>从手机相册选择</Text>
							</TouchableOpacity>

						</View>
					</View>
				</ModalBox>
			</View>
		);
	}
	loadingView() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
				<ActivityIndicator size="large" color="#fe728c" />
			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	header: {
		height: 150,
		backgroundColor: "#f0f0f0",
		justifyContent: 'center',
		alignItems: "center"
	},
	photo: {
		width: 90,
		height: 90,
		borderColor: "#fff",
		borderWidth: 3,
		borderRadius: 80,
		marginBottom: 10,
	},
	headerTip: {
		color: "#999",
		fontSize: 14
	},
	content: {
		paddingVertical: 10,
		backgroundColor: "#fff"
	},
	row: {
		height: 40,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: "#f0f0f0",
		flexDirection: "row",
		alignItems: "center"
	},
	label: {
		width: 100,
		color: "#666",
		fontSize: 14,
	},

	EditButton: {
		flex: 1,
		marginLeft: 20,
		overflow: "hidden",
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center"
	},
	EditText: {
		marginRight: 15,
	},
	arrows: {
		color: "#ccc",
		fontSize: 14
	},
	modalContent: {
		width: 240,
		height: 120,
		borderRadius: 5,
		backgroundColor: "#fff"
	},
	modalHeader: {
		height: 40,
		padding: 10,
		borderBottomColor: "#fe728c",
		borderBottomWidth: 1,
		justifyContent: "center"
	},
	modalTitle: {
		color: "#fe728c",
		fontSize: 13,
	},
	modalBody: {
		flex: 1,
		paddingHorizontal: 10,
	},
	inputGroup: {
		height: 38,
		borderBottomColor: "#f0f0f0",
		borderBottomWidth: 1,
		justifyContent: "center",
	},
	inputText: {
		color: "#333",
		fontSize: 13
	}
})