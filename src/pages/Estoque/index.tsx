import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

import styles from './index.css';
import CardListagem from '../../components/CardListagem';
import EstoqueInterface from '../../interfaces/estoque';
import { useNavigation } from '@react-navigation/native';

export default function Estoque() {

    const navigation = useNavigation();
    
    const [data, setData] = useState<EstoqueInterface[]>([
        { id: 1, nome: 'Madeira', detalhes: 'Teste de uma descrição bem grande de um dos produtos cadastrados.', image: require('../../assets/estoque.png')},
        { id: 2, nome: 'Parafuso', detalhes: '', image: require('../../assets/produtos.png')},
        { id: 3, nome: 'Prego', detalhes: '', image: require('../../assets/clientes.png')},
        { id: 4, nome: 'Tinta', detalhes: '', image: require('../../assets/pedidos.png')},
      ]);

    const [lazyLoading, setLazyLoading] = useState<boolean>(false);

    function renderFooter () {
        if (lazyLoading) return null;
        return (
          <View>
            <ActivityIndicator size="large" color="#4bb0ee" />
          </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <CardListagem objeto={item} view="VisualizaEstoque" />
                )}
                keyExtractor={item => String(item.id)}
                ListFooterComponent={renderFooter}
                onEndReachedThreshold={0.1}
            />
            <View>
                <TouchableOpacity
                style={styles.fab}
                onPress={() => {
                    navigation.navigate("");
                }}
                >
                <Text style={styles.fabIcon}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
} 