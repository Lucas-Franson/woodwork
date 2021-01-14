import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, 
  ActivityIndicator, Text, ScrollView, 
  Image, TextInput, Alert, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Pedido from '../../interfaces/pedido';
import Cliente from '../../interfaces/cliente';
import styles from './visualiza.css';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import firebase from '../../components/Firebase';
import MultiSelect from 'react-native-multiple-select';
import { Picker } from 'react-native';
import Produto from '../../interfaces/produto';
import { FlatList } from 'react-native';
import ProdutoSelecionado from '../../components/ProdutoSetado';

export default function VisualizaPedido() {

    const route = useRoute();
    const routeParams = route.params as Pedido;
  
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>();
    const [disabled, setDisabled] = useState<boolean>(false);
    const [data, setData] = useState({
        id: 0,
        nome: '',
        detalhes: '',
        idCliente: 0,
        itens: [],
        dataFinal: new Date(),
        valorFinal: '',
    });
    const [clientes, setClientes] = useState<Cliente[]>([]);
  
    useEffect(() => {
      if(!!routeParams) {
        var selected = [] as number[];
        routeParams.itens.map(x=> {
          selected.push(x.id);
        });
        setSelectedItems(selected);

        setData({ ...routeParams });
      } else {
        firebase.database().ref('pedido').on('value', (snapshot) => {
          const pedido:any = [];
  
          snapshot.forEach(element => {
            pedido.push(element.val());
          });
          
          if(!!pedido){
            if(pedido.length > 0) {
              var arr = pedido.pop();
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

      firebase.database()
            .ref('/cliente/')
            .on('value', snapshot => {
                const cliente:any = [];
                snapshot.forEach(element => {
                    cliente.push(element.val());
                });
                
                if(!!cliente){
                    setClientes([ ...cliente ]);
                }
          });

        firebase.database()
            .ref('/produto/')
            .on('value', snapshot => {
                const produto:any = [];
                snapshot.forEach(element => {
                    produto.push(element.val());
                });
                
                if(!!produto){
                    setProdutos(produto);
                }
          });
    }, []);
  
    async function salvar() {
      setModalVisible(true);
      setIsLoading(true);
      
      await firebase.database().ref('pedido/' + data.id).set(data).then((resp) => {
        setIsLoading(false);
        setData({
          id: 0,
          nome: '',
          detalhes: '',
          idCliente: 0,
          itens: [],
          dataFinal: new Date(),
          valorFinal: '',
        })  
        setSelectedItems([]);
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
        <ScrollView>
            <View style={styles.formulario}>
                <View style={styles.formGroup}>
                    <Text>Nome</Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder={'Identificador...'}
                        maxLength={44}
                        onFocus={() => setDisabled(true)}
                        onBlur={() => setDisabled(false)}
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
                        placeholder={'Pedido com algumas observações...'}
                        maxLength={44}
                        onFocus={() => setDisabled(true)}
                        onBlur={() => setDisabled(false)}
                        autoCompleteType={'off'}
                        value={data.detalhes}
                        autoCorrect={false}
                        onChangeText={(text) => setData({ ...data, detalhes: text }) }
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text>Valor</Text>
                    <TextInput 
                        style={styles.textInput}
                        editable={true}
                        placeholder={'R$ 0,00'}
                        maxLength={44}
                        onFocus={() => setDisabled(true)}
                        onBlur={() => setDisabled(false)}
                        keyboardType={'number-pad'}
                        value={data.valorFinal}
                        autoCorrect={false}
                        onChangeText={(text) => setData({ ...data, valorFinal: text }) }
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text>Cliente</Text>
                    <Picker
                        selectedValue={data.idCliente}
                        onValueChange={(itemValue, itemIndex) => setData({ ...data, idCliente: itemValue })}>
                        
                        {
                            clientes.map(cliente => (
                                <Picker.Item label={cliente.nome} value={cliente.id} />   
                            ))
                        }

                    </Picker>
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
                            <ProdutoSelecionado 
                              selecionado={item} 
                              itens={data} 
                              setData={setData} 
                              setDisabled={setDisabled} />
                        )}
                        keyExtractor={item => String(item)}
                        onEndReachedThreshold={0.1}
                    />
                </View>
            </View>
            <View style={styles.blockSalvar}>
                <TouchableHighlight 
                    onPress={salvar}
                    style={styles.btnAcoes}
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