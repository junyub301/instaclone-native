import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import Slider from "@react-native-community/slider";
import { Camera } from "expo-camera";

const Container = styled.View`
    flex: 1;
    background-color: black;
`;

const Actions = styled.View`
    flex: 0.35;
    padding: 0px 50px;
    align-items: center;
    justify-content: space-around;
`;

const ButtonsContainer = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const TakePhotoBtn = styled.TouchableOpacity`
    width: 100px;
    height: 100px;
    background-color: rgba(255, 255, 255, 0.5);
    border: 2px solid rgba(255, 255, 255, 0.8);
    border-radius: 50px;
`;

const SliderContainer = styled.View``;

export default function TakePhoto() {
    const [ok, setOk] = useState(false);
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
    const [zoom, setZoom] = useState(0);
    const [camerType, setCamerType] = useState(Camera.Constants.Type.back);
    const getPermissions = async () => {
        const { granted } = await Camera.requestPermissionsAsync();
        setOk(granted);
    };

    useEffect(() => {
        getPermissions();
    }, []);
    const onCameraSwitch = () => {
        if (camerType === Camera.Constants.Type.front) {
            setCamerType(Camera.Constants.Type.back);
        } else {
            setCamerType(Camera.Constants.Type.front);
        }
    };
    const onZoomValueChange = (e) => {
        setZoom(e);
    };
    const onFlashChange = () => {};
    return (
        <Container>
            <Camera type={camerType} style={{ flex: 1 }} zoom={zoom} />
            <Actions>
                <SliderContainer>
                    <Slider
                        style={{ width: 200, height: 40 }}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor='#FFFFFF'
                        maximumTrackTintColor='rgba(255,255,255,0.5)'
                        onValueChange={onZoomValueChange}
                    />
                </SliderContainer>
                <ButtonsContainer>
                    <TakePhotoBtn />
                    <TouchableOpacity onPress={onCameraSwitch}>
                        <Ionicons
                            size={30}
                            color='white'
                            name={
                                camerType === Camera.Constants.Type.front
                                    ? "camera-reverse"
                                    : "camera"
                            }
                        />
                    </TouchableOpacity>
                </ButtonsContainer>
            </Actions>
        </Container>
    );
}
