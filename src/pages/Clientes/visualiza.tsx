import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, 
  ActivityIndicator, Text, ScrollView, 
  Image, TextInput, Alert, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Cliente from '../../interfaces/cliente';
import styles from './visualiza.css';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import firebase from '../../components/Firebase';


export default function VisualizaCliente() {

  const route = useRoute();
  const routeParams = route.params as Cliente;

  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    id: 0,
    nome: "",
    contato: "",
    cep: "",
    bairro: "",
    endereco: "",
    numero: 0,
    observacao: "",
    image: ""
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
      firebase.database().ref('cliente').on('value', (snapshot) => {
        const cliente:any = [];

        snapshot.forEach(element => {
          cliente.push(element.val());
        });
        
        if(!!cliente){
          if(cliente.length > 0) {
            var arr = cliente.pop();
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
    await firebase.database().ref('cliente/' + data.id).set(data).then((resp) => {
      setIsLoading(false);
      setData({
          id: 0,
          nome: "",
          contato: "",
          cep: "",
          bairro: "",
          endereco: "",
          numero: 0,
          observacao: "",
          image: ""
      })
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

  return(
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
                    placeholder={'José...'}
                    maxLength={44}
                    value={data.nome}
                    autoCorrect={false}
                    onChangeText={(text) => setData({ ...data, nome: text })}
                />
            </View>
            <View style={styles.formGroup}>
                <Text>Contato</Text>
                <TextInput 
                    style={styles.textInput}
                    placeholder={'15999999999'}
                    maxLength={12}
                    value={data.contato}
                    autoCorrect={false}
                    keyboardType="number-pad"
                    onChangeText={(text) => setData({ ...data, contato: text })}
                />
            </View>
            <View style={styles.formGroup}>
                <Text>Endereco</Text>
                <TextInput 
                    style={styles.textInput}
                    placeholder={'Rua Irma Ernestina...'}
                    maxLength={120}
                    autoCapitalize="words"
                    value={data.endereco}
                    autoCorrect={false}
                    onChangeText={(text) => setData({ ...data, endereco: text })}
                />
            </View>
            <View style={styles.formGroup}>
                <Text>Bairro</Text>
                <TextInput 
                    style={styles.textInput}
                    placeholder={'Parque São Jorge...'}
                    maxLength={120}
                    autoCapitalize="words"
                    value={data.bairro}
                    autoCorrect={false}
                    onChangeText={(text) => setData({ ...data, bairro: text })}
                />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text>CEP</Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder={'18000000'}
                        maxLength={9}
                        value={data.cep}
                        autoCorrect={false}
                        keyboardType="number-pad"
                        onChangeText={(text) => setData({ ...data, cep: text })}
                    />
                </View>
                <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text>Número</Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder={'132'}
                        maxLength={5}
                        value={data.numero.toString()}
                        autoCorrect={false}
                        keyboardType="number-pad"
                        onChangeText={(text) => setData({ ...data, numero: parseInt(text) })}
                    />
                </View>
            </View>
            <View style={styles.formGroup}>
                <Text>Observação</Text>
                <TextInput 
                    style={[styles.textInput, { height: 100 }]}
                    placeholder={'Obs...'}
                    multiline={true}
                    numberOfLines={5}
                    maxLength={400}
                    value={data.observacao}
                    autoCorrect={false}
                    onChangeText={(text) => setData({ ...data, observacao: text })}
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