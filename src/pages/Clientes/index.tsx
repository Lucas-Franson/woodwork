import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

import styles from './index.css';
import CardListagem from '../../components/CardListagem';
import ClienteInterface from '../../interfaces/cliente';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../components/Firebase';

export default function Clientes() {

    const navigation = useNavigation();

    const [lazyLoading, setLazyLoading] = useState<boolean>(false);
    const [data, setData] = useState<ClienteInterface[]>([]);

    useEffect(() => {
        async function listar() {
            await firebase.database()
            .ref('/cliente/')
            .on('value', snapshot => {
                const cliente:any = [];
                snapshot.forEach(element => {
                    cliente.push(element.val());
                });
                
                if(!!cliente){
                    setData([...cliente]);
                }
                setLazyLoading(true);
            });
        }

        listar();
    }, []);

    async function remove(id:number) {
        await firebase.database().ref('cliente/'+id).remove();
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
                    <CardListagem objeto={item} remove={remove} view="VisualizaCliente" />
                )}
                keyExtractor={item => String(item.id)}
                ListFooterComponent={renderFooter}
                onEndReachedThreshold={0.1}
            />
            <View>
                <TouchableOpacity
                style={styles.fab}
                onPress={() => {
                    navigation.navigate("VisualizaCliente");
                }}
                >
                    <Text style={styles.fabIcon}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
} 