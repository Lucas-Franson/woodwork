import React, { useEffect, useState } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
    textInput: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        padding: 5,
        borderRadius: 10
    }
})

export default function ProdutoSelecionado(props: any) {

    const [produto, setProduto] = useState({
      id: 0,
      nome: '',
      qtd: 0
    });
  
    useEffect(() => {
      let produto = props.itens.itens.filter((x:any)=> x.id == props.selecionado);
      setProduto(produto[0]);  
    }, [null]);
  
    function handleChangeQtd(quantidade: number) {
      let qtd = isNaN(quantidade) ? 0 : quantidade;
      setProduto({ ...produto, qtd });
    }
  
    function handleBlurQtd() {
      let arr = props.itens.itens.filter((x:any)=> x.id != produto.id);
  
      arr.push(produto);
  
      props.setData({...props.itens, itens: arr });
      props.setDisabled(false);
    }
  
    return (
      <View style={{ flexDirection: 'row', margin: 5 }}>
        <View style={{ justifyContent: 'center', flex: 2 }}>
          <Text>{produto.nome}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <TextInput 
              style={[styles.textInput, { width: 100 }]}
              editable={true}
              placeholder={'Quantidade...'}
              autoCompleteType={'cc-number'}
              keyboardType={'numeric'}
              value={produto.qtd+''}
              autoCorrect={false}
              onFocus={() => props.setDisabled(true)}
              key={produto.id}
              onBlur={handleBlurQtd}
              onChangeText={(text) => handleChangeQtd(parseInt(text)) }
            />
        </View>
      </View>
    );
  }