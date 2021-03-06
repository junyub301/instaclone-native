import React, { useState, useEffect, useRef } from "react";
import {
    StatusBar,
    Image,
    View,
    Text,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import Slider from "@react-native-community/slider";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useIsFocused } from "@react-navigation/core";

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
const ActionsContainer = styled.View`
    flex-direction: row;
`;

const CloseButton = styled.TouchableOpacity`
    position: absolute;
    top: 20px;
    left: 20px;
`;

const PhotoActions = styled(Actions)`
    flex-direction: row;
`;
const PhotoAction = styled.TouchableOpacity`
    background-color: white;
    padding: 5px 25px;
    height: 30px;
    border-radius: 5px;
`;
const PhotoActionText = styled.Text`
    font-weight: 600;
`;

export default function TakePhoto({ navigation }) {
    const camera = useRef();
    const [takenPhoto, setTakePhoto] = useState("");
    const [cameraReady, setCameraReady] = useState(false);
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
    const onFlashChange = () => {
        if (flashMode === Camera.Constants.FlashMode.off) {
            setFlashMode(Camera.Constants.FlashMode.on);
        } else if (flashMode === Camera.Constants.FlashMode.on) {
            setFlashMode(Camera.Constants.FlashMode.auto);
        } else if (flashMode === Camera.Constants.FlashMode.auto) {
            setFlashMode(Camera.Constants.FlashMode.off);
        }
    };
    const goToUpload = async (save) => {
        if (save) {
            await MediaLibrary.saveToLibraryAsync(takenPhoto);
        }
        navigation.navigate("UploadForm", {
            file: takenPhoto,
        });
    };
    const onUpload = () => {
        Alert.alert("Save Photo?", "Save Photo & upload or just upload", [
            {
                text: "Save & Upload",
                onPress: () => goToUpload(true),
            },
            { text: "Just Upload", onPress: () => goToUpload(false) },
        ]);
    };

    const onCameraReaday = () => setCameraReady(true);
    const takePhoto = async () => {
        if (camera.current && cameraReady) {
            const { uri } = await camera.current.takePictureAsync({
                quality: 1,
                exif: true,
            });
            setTakePhoto(uri);
            // const asset = await MediaLibrary.createAssetAsync(uri);
        }
    };

    const onDismiss = () => setTakePhoto("");
    const isFocused = useIsFocused();

    return (
        <Container>
            {isFocused ? <StatusBar hidden={true} /> : null}
            {takenPhoto === "" ? (
                <Camera
                    type={camerType}
                    style={{ flex: 1 }}
                    zoom={zoom}
                    flashMode={flashMode}
                    ref={camera}
                    onCameraReady={onCameraReaday}
                >
                    <CloseButton onPress={() => navigation.navigate("Tabs")}>
                        <Ionicons name='close' color='white' size={30} />
                    </CloseButton>
                </Camera>
            ) : (
                <Image source={{ uri: takenPhoto }} style={{ flex: 1 }} />
            )}
            {takenPhoto === "" ? (
                <Actions>
                    <SliderContainer>
                        <Slider
                            style={{ width: 200, height: 40 }}
                            value={zoom}
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor='#FFFFFF'
                            maximumTrackTintColor='rgba(255,255,255,0.5)'
                            onValueChange={onZoomValueChange}
                        />
                    </SliderContainer>
                    <ButtonsContainer>
                        <TakePhotoBtn onPress={takePhoto} />
                        <ActionsContainer>
                            <TouchableOpacity
                                onPress={onFlashChange}
                                style={{ marginRight: 30 }}
                            >
                                <Ionicons
                                    size={30}
                                    color='white'
                                    name={
                                        flashMode ===
                                        Camera.Constants.FlashMode.off
                                            ? "flash-off"
                                            : flashMode ===
                                              Camera.Constants.FlashMode.on
                                            ? "flash"
                                            : flashMode ===
                                              Camera.Constants.FlashMode.auto
                                            ? "eye"
                                            : ""
                                    }
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onCameraSwitch}>
                                <Ionicons
                                    size={30}
                                    color='white'
                                    name={
                                        camerType ===
                                        Camera.Constants.Type.front
                                            ? "camera-reverse"
                                            : "camera"
                                    }
                                />
                            </TouchableOpacity>
                        </ActionsContainer>
                    </ButtonsContainer>
                </Actions>
            ) : (
                <PhotoActions>
                    <PhotoAction onPress={onDismiss}>
                        <PhotoActionText>Dismiss</PhotoActionText>
                    </PhotoAction>
                    <PhotoAction onPress={onUpload}>
                        <PhotoActionText>Uplaod</PhotoActionText>
                    </PhotoAction>
                </PhotoActions>
            )}
        </Container>
    );
}
