import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../components/Firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  contentList: {
    flex: 1,
  },

  cardContent: {
    marginLeft: 30,
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#ebf0f7',
  },

  codigoProduto: {
    flex: 1,
    alignSelf: 'center',
  },

  card: {
    backgroundColor: 'white',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderColor: '#ebf0f7',
  },

  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'flex-start',
    color: '#3399ff',
    fontFamily: 'Roboto_500Medium'
  },

  detalhes: {
    fontSize: 12,
    flex: 1,
    textAlign: 'justify',
    color: '#6666ff',
    width: 200,
    fontFamily: 'Roboto_400Regular'
  },

  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#242424',
  },

  followButtonText: {
    color: '#242424',
    fontSize: 12,
  },

  removerButton: {
    marginTop: 10,
    marginLeft: 15,
    height: 35,
    width: 100,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'tomato',
  },

  removerButtonText: {
    color: 'tomato',
    fontSize: 12,
  },

    
});

export default function CardListagem(item: any) {
    const navigation = useNavigation();

    let hasPhoto = item.objeto.image ?? false;

    return (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate(item.view, item.objeto);
            }}
          >
            {hasPhoto ? (
              <View>
                <Image
                  style={styles.image}
                  source={{ uri: item.objeto.image }}
                />
              </View>
            ) : (
              <View>
                <Image style={styles.image} source={require('../assets/semfoto.png')} />
                <Text style={styles.codigoProduto}>{item.objeto.Codigo}</Text>
              </View>
            )}
            <View style={styles.cardContent}>
              <Text style={styles.name}>{item.objeto.nome}</Text>
              <Text style={styles.detalhes}>{item.objeto.detalhes}</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.followButton}
                  onPress={() => {
                    navigation.navigate(item.view, item.objeto);
                  }}
                >
                  <Text style={styles.followButtonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.removerButton}
                  onPress={() => item.remove(item.objeto.id)}
                >
                  <Text style={styles.removerButtonText}>Remover</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
}