import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Button, 
  ActivityIndicator, Text, ScrollView, 
  Image, TextInput, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Estoque from '../../interfaces/estoque';
import styles from './visualiza.css';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { TouchableOpacity, TouchableHighlight, TouchableNativeFeedback } from 'react-native-gesture-handler';
import firebase from '../../components/Firebase';
import AwesomeAlert from '@types/react-native-awesome-alerts';


export default function VisualizaEstoque() {

  const route = useRoute();
  const routeParams = route.params as Estoque;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState({
    id: 0,
    detalhes: "",
    image: "",
    nome: "",
    quantidade: 0
  });

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

  useEffect(() => {
    if(!!routeParams) setData({ ...routeParams });
  }, []);
  
    
  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync();

    console.log(result);

    if (!result.cancelled) {
      setData({ ...data, image: result.uri });
      
    }
  };

  function salvar() {
    firebase.database().ref('estoque/' + data.id).set(data).then((resp) => {
      Alert.alert("Salvo!", "Estoque salvo com sucesso.");
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? <ActivityIndicator size="large" color="#f48120" /> : <Text />}
      <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="AwesomeAlert"
          message="I have a message for you!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Yes, delete it"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
      <ScrollView>
        <View style={styles.image}>
          <TouchableOpacity onPress={pickImage}>
            {data.image != "" ? (
              <Image
                  style={{
                      paddingVertical: 30,
                      width: 150,
                      height: 150,
                      borderRadius: 75,
                      marginBottom: 10,
                  }}
                  resizeMode="cover"
                  source={{uri: data.image }}
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
                    source={require('../../assets/semfoto.png')}
                  />
            )}
          </TouchableOpacity>
        </View>
                  
        <View style={styles.formulario}>
          <View style={styles.formGroup}>
            <Text>Nome</Text>
            <TextInput 
              style={styles.textInput}
              placeholder={'Parafuso...'}
              maxLength={44}
              value={data.nome}
              autoCorrect={false}
              onChangeText={(text) => setData({ ...data, nome: text })}
            />
          </View>
          <View style={styles.formGroup}>
            <Text>Descrição</Text>
            <TextInput 
              style={styles.textInput}
              editable={true}
              placeholder={'Usado para parafusar...'}
              maxLength={44}
              autoCompleteType={'off'}
              value={data.detalhes}
              autoCorrect={false}
              onChangeText={(text) => setData({ ...data, detalhes: text }) }
            />
          </View>
          <View style={styles.formGroup}>
            <Text>Quantidade</Text>
            <TextInput 
              style={[styles.textInput, { width: 100 }]}
              editable={true}
              placeholder={'Quantidade...'}
              autoCompleteType={'cc-number'}
              keyboardType={'numeric'}
              value={data.quantidade.toString()}
              autoCorrect={false}
              onChangeText={(text) => setData({ ...data, quantidade: parseInt((text == "" ? "0" : text)) }) }
            />
          </View>
        </View>
        <View style={styles.blockSalvar}>
          <TouchableHighlight 
            onPress={salvar}
            style={styles.btnAcoes}
            accessibilityLabel="Salvar os dados preenchidos"
            underlayColor="#53907a"
          >
            <Text style={{ fontSize: 16, fontFamily: 'Roboto_500Medium' }}>Salvar</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
    
}