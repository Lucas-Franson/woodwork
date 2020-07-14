import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

import styles from './index.css';
import CardListagem from '../../components/CardListagem';
import EstoqueInterface from '../../interfaces/estoque';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../components/Firebase';

export default function Estoque() {

    const navigation = useNavigation();

    const [lazyLoading, setLazyLoading] = useState<boolean>(false);
    const [data, setData] = useState<EstoqueInterface[]>([]);

    useEffect(() => {
        async function listar() {
            await firebase.database()
            .ref('/estoque/')
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
        await firebase.database().ref('estoque/'+id).remove();
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
                    <CardListagem objeto={item} remove={remove} view="VisualizaEstoque" />
                )}
                keyExtractor={item => String(item.id)}
                ListFooterComponent={renderFooter}
                onEndReachedThreshold={0.1}
            />
            <View>
                <TouchableOpacity
                style={styles.fab}
                onPress={() => {
                    navigation.navigate("VisualizaEstoque");
                }}
                >
                    <Text style={styles.fabIcon}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
} 