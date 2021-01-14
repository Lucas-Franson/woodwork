import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native';
import { View, Text } from 'react-native';
import CardListagem from '../../components/CardListagem';

import PedidoInterface from '../../interfaces/pedido';

import styles from './index.css';

export default function Pedidos() {
    const navigation = useNavigation();

    const [lazyLoading, setLazyLoading] = useState<boolean>(false);
    const [data, setData] = useState<PedidoInterface[]>([]);

    useEffect(() => {
        async function listar() {
            await firebase.database()
            .ref('/pedido/')
            .on('value', snapshot => {
                const estoque:any = [];
                snapshot.forEach(element => {
                    estoque.push(element.val());
                });
                
                if(!!estoque){
                    setData([...estoque]);
                }
                setLazyLoading(true);
            });
        }

        listar();
    }, []);

    async function remove(id:number) {
        await firebase.database().ref('pedido/'+id).remove();
    }

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
                    <CardListagem objeto={item} remove={remove} pedidos={true} view="VisualizaPedido" />
                )}
                keyExtractor={item => String(item.id)}
                ListFooterComponent={renderFooter}
                onEndReachedThreshold={0.1}
            />
            <View>
                <TouchableOpacity
                style={styles.fab}
                onPress={() => {
                    navigation.navigate("VisualizaPedido");
                }}
                >
                    <Text style={styles.fabIcon}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
} 