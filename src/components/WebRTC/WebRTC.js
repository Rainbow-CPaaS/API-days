import React from 'react';
import './webRTC-styles.css';
import TitleBar from '../UI/TitleBar';
import Button from '../UI/Button';

class WebRTC extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            canMakeAudioVideoCall: '',
            hasACamera: '',
            hasAMicrophone: '',
            callStatus: null,
            call: null,
			callHasVideo: false,

        }

        this.showState = this.showState.bind(this);
        this.callInAudio = this.callInAudio.bind(this);
        this.callInVideo = this.callInVideo.bind(this);
        this.onWebRTCCallChanged = this.onWebRTCCallChanged.bind(this);
        this.releaseCall = this.releaseCall.bind(this);
        this.answerCall = this.answerCall.bind(this);
        this.getPeerConnection = this.getPeerConnection.bind(this);
        this.muteAudioCall = this.muteAudioCall.bind(this);
        this.muteVideoCall = this.muteVideoCall.bind(this);
        this.removeVideoFromCall = this.removeVideoFromCall.bind(this);
        this.addVideoToCall = this.addVideoToCall.bind(this);

    }

    componentDidMount () {
        this.setState({canMakeAudioVideoCall: rainbowSDK.webRTC.canMakeAudioVideoCall()});
        this.setState({hasACamera: rainbowSDK.webRTC.hasACamera()});
        this.setState({hasAMicrophone: rainbowSDK.webRTC.hasAMicrophone()});
        $(document).on(rainbowSDK.webRTC.RAINBOW_ONWEBRTCCALLSTATECHANGED, this.onWebRTCCallChanged);
		$(document).on(rainbowSDK.webRTC.RAINBOW_ONWEBRTCTRECORDDONE, this.onWebRtcRecordDone);
    }

    showState() {
        console.log(this.state);
    }

    callInAudio () {
		console.log('[WEBRTC] :: CallInAudio')
        let res = rainbowSDK.webRTC.callInAudio(this.props.chosenUser);
        console.log(res);
        if(res.label === "OK") {
            this.setState({callStatus: "dialing"});
        }

    }

    callInVideo () {
        let res = rainbowSDK.webRTC.callInVideo(this.props.chosenUser);
        
        console.log(res);
        if(res.label === "OK") {
            this.setState({callStatus: "dialing", callHasVideo: true});
        }
        
    }

    answerCall () {
        if (this.state.call.remoteMedia === 3) {
            rainbowSDK.webRTC.answerInVideo(this.state.call);
        } else {
            rainbowSDK.webRTC.answerInAudio(this.state.call);
        }
     }

    releaseCall () {
        rainbowSDK.webRTC.release(this.state.call);
        rainbowSDK.webRTC.hideLocalVideo();
		this.setState({call: null})
    }

    onWebRTCCallChanged (event, call) {
        console.log('Call changed: ', call);
        if(call.status.value === "Unknown") {
            this.setState({callStatus: null})
            rainbowSDK.webRTC.hideLocalVideo();
            rainbowSDK.webRTC.hideRemoteVideo(call);

        } else {
            this.setState({callStatus: call.status.value, call: call}); 
        }

        if(call.status.value === "active" && call.type.value === "Video") {
            rainbowSDK.webRTC.showLocalVideo();
        }
    }

    goFullScreen () {
        if(!document.fulscreenElement) {
            event.target.requestFullscreen()
        } else {
            document.exitFullscreen();
        }
        
    }

    getPeerConnection () {
        let peerConnection = rainbowSDK.webRTC.getPeerConnectionForCall(this.state.call);
        console.log('PC: ', peerConnection);
    }
    
    muteAudioCall () {
        let conversation = rainbowSDK.conversations.getConversationById(this.state.call.conversationId);
        rainbowSDK.webRTC.muteAudioCall(conversation);

    }

    muteVideoCall () {
        let conversation = rainbowSDK.conversations.getConversationById(this.state.call.conversationId);
        rainbowSDK.webRTC.muteVideoCall(conversation);

    }

	removeVideoFromCall () {
		let status = rainbowSDK.webRTC.removeVideoFromCall(this.state.call);
		console.log(status);
		this.setState({callHasVideo: false})
	}

	addVideoToCall () {
		let status = rainbowSDK.webRTC.addVideoToCall(this.state.call);
		console.log(status);

		this.setState({callHasVideo: true})
	}



    render() {
        return (
            <div id="WebRTC">
				<TitleBar title={this.state.callStatus ? `${this.props.chosenUser.displayName} | Status: ${this.state.callStatus}` : `${this.props.chosenUser.displayName}`}/>
                <div>
                    { this.props.chosenUser && (this.props.chosenUser.status === "online" || this.props.chosenUser.status === "away" || this.props.chosenUser.status === "online-mobile")  && this.state.callStatus == null ?
                        <div>
							<Button class="ButtonCall" type="button" buttonTitle="Call Audio" action={this.callInAudio}/>
							<Button class="ButtonCall" type="Button" buttonTitle="Call Audio + Video" action={this.callInVideo} />
                        </div>
						:
                        <div>
							<Button class="ButtonInactive" type="button" buttonTitle="Call Audio" />
							<Button class="ButtonInactive" type="Button" buttonTitle="Call Audio + Video" />
                        </div>
                    }
                </div>
                
                <div>
                    {this.state.callStatus === "incommingCall" && <button type="button" onClick={this.answerCall}>Answer call</button> }
                    <br />
					{this.state.callStatus && <Button class="ButtonHangUp" buttonTitle="Hang up" type="button" action={this.releaseCall} />}

					{this.state.callStatus === "active" && this.state.callHasVideo && <Button class="ButtonOption" buttonTitle="Remove Video" type="button" action={this.removeVideoFromCall}/>} 
					{this.state.callStatus === "active" && !this.state.callHasVideo && <Button class="ButtonOption" buttonTitle="Add Video" type="button" action={this.addVideoToCall}/> }

                </div>


				{this.state.callStatus &&  <div id="videoContainer" onDoubleClick={this.goFullScreen}>
					{this.state.call && this.state.call.localMedia > 1 && <video id="minivideo" autoPlay muted></video>}
                    <video id="largevideo" autoPlay ></video>
                    <video id="globalVideoTag" autoPlay style={{display: 'none'}}></video>
                    <audio id="globalAudioTag" autoPlay style={{display: 'none'}}></audio>
                </div>
				}

                
            </div>
        )
    }
}

export default WebRTC;
