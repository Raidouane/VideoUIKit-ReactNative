import React, {useContext} from 'react';
import {View} from 'react-native';
import styles from '../Style';
import EndCall from './Local/EndCall';
import LocalAudioMute from './Local/LocalAudioMute';
import LocalVideoMute from './Local/LocalVideoMute';
import SwitchCamera from './Local/SwitchCamera';
import RemoteControls from './RemoteControls';
import {MaxUidConsumer} from '../Contexts/MaxUidContext';
import PropsContext, {Layout} from '../Contexts/PropsContext';
import {ClientRoleType} from 'react-native-agora';
import {LocalContext} from "../../Contexts";

interface ControlsPropsInterface {
    showButton?: boolean;
    agoraEngineRef?: any;
}

const Controls: React.FC<ControlsPropsInterface> = (props) => {
    const {styleProps, rtcProps} = useContext(PropsContext);
    const {localBtnContainer} = styleProps || {};
    const showButton = props.showButton !== undefined ? props.showButton : true;
    const local = useContext(LocalContext);
    props.agoraEngineRef.current.local = local;

    return (
        <>
            <View style={{...styles.Controls, ...(localBtnContainer as object)}}>
                {rtcProps.role !== ClientRoleType.ClientRoleAudience && (
                    <>
                        <LocalAudioMute/>
                        <LocalVideoMute/>
                        <SwitchCamera/>
                    </>
                )}
                <EndCall/>
            </View>
            {showButton ? (
                <MaxUidConsumer>
                    {(users) => (
                        <View
                            style={{
                                ...styles.Controls,
                                bottom: styles.Controls.bottom + 70,
                            }}>
                            {rtcProps.layout !== Layout.Grid && (
                                <RemoteControls user={users[0]} showRemoteSwap={false}/>
                            )}
                        </View>
                    )}
                </MaxUidConsumer>
            ) : (
                <></>
            )}
        </>
    );
};

export default Controls;
