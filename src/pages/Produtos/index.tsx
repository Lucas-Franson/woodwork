import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

import styles from './index.css';
import CardListagem from '../../components/CardListagem';
import ProdutoInterface from '../../interfaces/produto';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../components/Firebase';

export default function Produtos() {

    const navigation = useNavigation();

    const [lazyLoading, setLazyLoading] = useState<boolean>(false);
    const [data, setData] = useState<ProdutoInterface[]>([]);

    useEffect(() => {
        async function listar() {
            await firebase.database()
            .ref('/produto/')
            .on('value', snapshot => {
                const produto:any = [];
                snapshot.forEach(element => {
                    produto.push(element.val());
                });
                
                if(!!produto){
                    setData([...produto]);
                }
                setLazyLoading(true);
            });
        }

        listar();
    }, []);

    async function remove(id:number) {
        await firebase.database().ref('produto/'+id).remove();
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
                    <CardListagem objeto={item} remove={remove} view="VisualizaProduto" />
                )}
                keyExtractor={item => String(item.id)}
                ListFooterComponent={renderFooter}
                onEndReachedThreshold={0.1}
            />
            <View>
                <TouchableOpacity
                style={styles.fab}
                onPress={() => {
                    navigation.navigate("VisualizaProduto");
                }}
                >
                    <Text style={styles.fabIcon}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
} 