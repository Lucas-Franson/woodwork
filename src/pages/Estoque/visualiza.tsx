import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, 
  ActivityIndicator, Text, ScrollView, 
  Image, TextInput, Alert, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Estoque from '../../interfaces/estoque';
import styles from './visualiza.css';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import firebase from '../../components/Firebase';


export default function VisualizaEstoque() {

  const route = useRoute();
  const routeParams = route.params as Estoque;

  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    if(!!routeParams) {
      setData({ ...routeParams });
    } else {
      firebase.database().ref('estoque').on('value', (snapshot) => {
        const estoque:any = [];

        snapshot.forEach(element => {
          estoque.push(element.val());
        });
        
        if(!!estoque){
          if(estoque.length > 0) {
            var arr = estoque.pop();
            let id = arr.id + 1;
            setData({...data, id });
          } else {
            setData({...data, id: 1 });  
          }
        } else {
          setData({...data, id: 1 });
        }
    });
    }
  }, []);
  
  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync();

    console.log(result);

    if (!result.cancelled) {
      setData({ ...data, image: result.uri });
      
    }
  };

  async function salvar() {
    setModalVisible(true);
    setIsLoading(true);
    await firebase.database().ref('estoque/' + data.id).set(data).then((resp) => {
      setIsLoading(false);
      setTimeout(() => {
        setModalVisible(false);
      }, 1000);
    });
  }

  function SearchFilter() {
    return (
        <View>
          
          <Modal  
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
            }}
          >
            
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <TouchableWithoutFeedback
                  onPress={() => setModalVisible(false)}
                >
                    {isLoading ? (
                      <View>
                        <View>
                          <ActivityIndicator size="large" color="#f48120" />
                        </View>
                        <Text style={styles.modalText}>Aguarde...</Text>
                      </View>
                    ) : (
                      <View style={{ flexDirection: 'row' }}>
                        <Icon name="check-circle" size={24} color="#0a0" />
                        <Text style={styles.modalText}>
                          Dados salvos
                        </Text>
                      </View>
                    )}
                  </TouchableWithoutFeedback>
                </View>
            </View>
          
          </Modal>
        </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <SearchFilter />
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