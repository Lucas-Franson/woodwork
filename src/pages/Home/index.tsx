import React, { useState } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, Text, KeyboardAvoidingView, Platform, FlatList, TouchableOpacity, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import menu from '../../interfaces/menu';

import styles from './index.css';

const Home = () => {
  const [data, setData] = useState<menu[]>([
    { id: 1, descricao: 'Estoque', image: require('../../assets/estoque.png')},
    { id: 2, descricao: 'Produtos', image: require('../../assets/produtos.png')},
    { id: 3, descricao: 'Clientes', image: require('../../assets/clientes.png')},
    { id: 4, descricao: 'Pedidos', image: require('../../assets/pedidos.png')},
  ]);
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined }>
      <View style={styles.main}>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={data}
          horizontal={false}
          numColumns={2}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate(item.descricao)}
            >
              <View style={styles.cardFooter} />
              <Image style={styles.cardImage} source={item.image} />
              <View style={styles.cardHeader}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.title}>{item.descricao}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  )
};

export default Home;

