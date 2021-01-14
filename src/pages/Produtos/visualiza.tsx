import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, FlatList,
  ActivityIndicator, Text, ScrollView, 
  Image, TextInput, Alert, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Produto from '../../interfaces/produto';
import styles from './visualiza.css';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import firebase from '../../components/Firebase';
import MultiSelect from 'react-native-multiple-select';
import Estoque from '../../interfaces/estoque';
import ProdutoSelecionado from '../../components/ProdutoSetado';



export default function VisualizaProduto() {

  const route = useRoute();
  const routeParams = route.params as Produto;

  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>();
  const [produtos, setProdutos] = useState<Estoque[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [data, setData] = useState({
    id: 0,
    nome: "",
    detalhes: "",
    itens: [],
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
      var selected = [] as number[];
      routeParams.itens.map(x=> {
        selected.push(x.id);
      });
      setSelectedItems(selected);

      setData({ ...routeParams });
    } else {
      firebase.database().ref('produto').on('value', (snapshot) => {
        const produto:any = [];
        
        snapshot.forEach(element => {
          produto.push(element.val());
        });
        
        if(!!produto){
          if(produto.length > 0) {
            var selected = [] as number[];
            data.itens.map(x=> {
              selected.push(x.id);
            });
            setSelectedItems(selected);

            var arr = produto.pop();
            let id = arr.id + 1;
            setData({...data, id });
          } else {
            var selected = [] as number[];
            data.itens.map(x=> {
              selected.push(x.id);
            });
            setSelectedItems(selected);

            setData({...data, id: 1 });  
          }
        } else {
          var selected = [] as number[];
          data.itens.map(x=> {
            selected.push(x.id);
          });
          setSelectedItems(selected);

          setData({...data, id: 1 });
        }
    });
    }
    
  }, []);

  useEffect(() => {
    async function listar() {
        await firebase.database()
        .ref('/estoque/')
        .on('value', snapshot => {
            const estoque:Estoque[] = [];
            snapshot.forEach(element => {
                estoque.push(element.val());
            });
            
            if(!!estoque){
                setProdutos(estoque);
            }
        });
    }

    listar();
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
    
    await firebase.database().ref('produto/' + data.id).set(data).then((resp) => {
      setIsLoading(false);
      setData({
          id: 0,
          detalhes: "",
          image: "",
          itens: [],
          nome: ""
      })
      setTimeout(() => {
        setModalVisible(false);
      }, 1000);
      setSelectedItems([]);
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

  function onSelectedItemsChange(items: number[]) {
    let itens:any = [];

    items.map((x:number) => {
      let obj = { id: x, nome: produtos.filter(y=> y.id == x)[0].nome, qtd: 0 };
      itens.push(obj);
    });

    setData({ ...data, itens });
    setSelectedItems(items);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchFilter />
      <ScrollView nestedScrollEnabled={true}>
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
              onFocus={() => setDisabled(true)}
              onBlur={() => setDisabled(false)}
              placeholder={'Estante...'}
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
              onFocus={() => setDisabled(true)}
              onBlur={() => setDisabled(false)}
              placeholder={'Dimensões de (x,y)...'}
              maxLength={44}
              autoCompleteType={'off'}
              value={data.detalhes}
              autoCorrect={false}
              onChangeText={(text) => setData({ ...data, detalhes: text }) }
              />
          </View>
          <View style={styles.formGroup}>
            <View style={{ flex: 1 }}>
              <Text style={{ margin: 5 }}>Produtos</Text>
              <MultiSelect
                hideTags
                items={produtos}
                uniqueKey="id"
                onSelectedItemsChange={onSelectedItemsChange}
                selectedItems={selectedItems}
                selectText="Selecione os itens"
                searchInputPlaceholderText="Procurar itens..."
                onChangeInput={(text) => console.log(text)}
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="nome"
                searchInputStyle={{ color: '#CCC' }}
                submitButtonColor="#CCC"
                submitButtonText="Selecionar"
                fixedHeight={true}
                />
            </View>
          </View>
          <View style={styles.formGroup}>
              <FlatList
                nestedScrollEnabled={true}
                data={selectedItems}
                renderItem={({ item }) => (
                  <ProdutoSelecionado selecionado={item} itens={data} setData={setData} setDisabled={setDisabled} />
                )}
                keyExtractor={item => String(item)}
                onEndReachedThreshold={0.1}
              />
          </View>
        </View>

        <View style={styles.blockSalvar}>
          <TouchableHighlight 
            onPress={salvar}
            style={[styles.btnAcoes, { backgroundColor: disabled ? '#aaa' : '#75B09C' }]}
            accessibilityLabel="Salvar os dados preenchidos"
            disabled={disabled}
            underlayColor="#53907a"
          >
            <Text style={{ fontSize: 16, fontFamily: 'Roboto_500Medium' }}>Salvar</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
    
}