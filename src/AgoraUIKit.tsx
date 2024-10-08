/**
 * @module AgoraUIKit
 */
import React from 'react';
import {View} from 'react-native';
import RtcConfigure from './RtcConfigure';
import {
    PropsProvider,
    PropsInterface,
    Layout,
    AgoraUIKitProps,
} from './Contexts/PropsContext';
import LocalControls from './Controls/LocalControls';
import GridVideo from './Views/GridVideo';
import PinnedVideo from './Views/PinnedVideo';
import RtmConfigure from './RtmConfigure';
import LocalUserContext from './Contexts/LocalUserContext';
import PopUp from './Controls/Remote/RemoteMutePopUp';

/**
 * Agora UIKit component following the v3 props
 * @returns Renders the UIKit
 */
const AgoraUIKitv3: React.FC<PropsInterface> = (props) => {
    const {layout} = props.rtcProps;
    return (
        <PropsProvider value={props}>
            <View style={[containerStyle, props.styleProps?.UIKitContainer]}>
                {props.loader && (
                    <View style={{position: 'absolute', top: 0, height: '100%', width: '100%', display: 'flex', justifyContent: 'center'}}>
                        {props.loader}
                    </View>
                )}
                <RtcConfigure key={props.rtcProps.channel} agoraEngineRef={props.agoraEngineRef}>
                    <LocalUserContext>
                        {props.rtcProps.disableRtm ? (
                            <>
                                {layout === Layout.Grid ? <GridVideo/> : <PinnedVideo/>}
                                <LocalControls agoraEngineRef={props.agoraEngineRef}/>
                            </>
                        ) : (
                            <RtmConfigure>
                                {layout === Layout.Grid ? <GridVideo/> : <PinnedVideo/>}
                                <LocalControls agoraEngineRef={props.agoraEngineRef}/>
                                <PopUp/>
                            </RtmConfigure>
                        )}
                    </LocalUserContext>
                </RtcConfigure>
            </View>
        </PropsProvider>
    );
};

/**
 * Agora UIKit component
 * @returns Renders the UIKit
 */
const AgoraUIKit: React.FC<AgoraUIKitProps> = (props) => {
    const {rtcUid, rtcToken, rtmToken, rtmUid, ...restConnectonData} =
        props.connectionData;
    const adaptedProps: PropsInterface = {
        rtcProps: {
            uid: rtcUid,
            token: rtcToken,
            ...restConnectonData,
            ...props.settings,
            callActive: true,
        },
        rtmProps: {
            token: rtmToken,
            uid: rtmUid,
            ...restConnectonData,
            ...props.settings,
        },
    };

    return (
        <AgoraUIKitv3
            agoraEngineRef={props.agoraEngineRef}
            rtcProps={adaptedProps.rtcProps}
            rtmProps={adaptedProps.rtmProps}
            callbacks={props.rtcCallbacks}
            rtmCallbacks={props.rtmCallbacks}
            styleProps={props.styleProps}
            loader={props.loader}

        />
    );
};

const containerStyle = {backgroundColor: '#000', flex: 1};

export default AgoraUIKit;
