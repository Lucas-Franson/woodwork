import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Button, ActivityIndicator, Text, ScrollView, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Estoque from '../../interfaces/estoque';
import styles from './visualiza.css';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function VisualizaEstoque() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [image, setImage] = useState("");

    const route = useRoute();

    const routeParams = route.params as Estoque;

    if(!!routeParams.image) {
        routeParams.image = require('../../assets/semfoto.png');
    }
    
    const hasPhoto = image != "";

    useEffect(() => {
        (async () => {
          if (Constants.platform?.ios) {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
              alert('Desculpe, precisamos da permissão da câmera para prosseguir!');
            }
          }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync();
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
          {isLoading ? <ActivityIndicator size="large" color="#f48120" /> : <Text />}
          <ScrollView>
            <TouchableOpacity onPress={pickImage}>
                {!hasPhoto ? (
                <Image
                    style={{
                        paddingVertical: 30,
                        width: 150,
                        height: 150,
                        borderRadius: 75,
                        marginBottom: 10,
                    }}
                    resizeMode="cover"
                    source={routeParams.image}
                    />
                ) : (
                    <Image
                    style={{
                        paddingVertical: 30,
                        width: 150,
                        height: 150,
                        borderRadius: 75,
                        marginBottom: 10,
                    }}
                    resizeMode="cover"
                    source={{uri: image }}
                    />
                )}
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      );
    
}