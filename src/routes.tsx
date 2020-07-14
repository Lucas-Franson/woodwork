import React from 'react';
import { Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Produtos from './pages/Produtos';
import Pedidos from './pages/Pedidos';
import Estoque from './pages/Estoque';
import Clientes from './pages/Clientes';
import VisualizaEstoque from './pages/Estoque/visualiza';
import VisualizaCliente from './pages/Clientes/visualiza';
import VisualizaProduto from './pages/Produtos/visualiza';

const AppStack = createStackNavigator();

const Title = () => {
    return (
        <View style={{ 
            justifyContent: 'center', 
            alignItems: 'center'
        }}>
            <View style={{
                backgroundColor: '#A09DAA',
                width: 60,
                padding: 10,
                borderRadius: 40
            }}>
                <Image 
                    style={{ width: 40, height: 29, resizeMode: 'stretch' }}
                    source={require('./assets/logo_2x.png')}
                />
            </View>
        </View>
    )
}

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator>
                <AppStack.Screen 
                    name="Home" 
                    component={Home}
                    options={{
                        headerTitle: props => <Title />,
                        headerStyle: {
                            backgroundColor: '#615D6C'
                        },
                        headerTintColor: '#FFF',
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        }
                    }}
                />
                <AppStack.Screen 
                    name="Produtos" 
                    component={Produtos} 
                    options={{
                        headerStyle: {
                            backgroundColor: '#615D6C'
                        },
                        headerTintColor: '#FFF',
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        }
                    }}
                />
                <AppStack.Screen 
                    name="Pedidos" 
                    component={Pedidos} 
                    options={{
                        headerStyle: {
                            backgroundColor: '#615D6C'
                        },
                        headerTintColor: '#FFF',
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        },
                        headerTitle: 'Pedidos'
                    }}
                />
                <AppStack.Screen 
                    name="Estoque" 
                    component={Estoque} 
                    options={{
                        headerStyle: {
                            backgroundColor: '#615D6C'
                        },
                        headerTintColor: '#FFF',
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        },
                        headerTitle: 'Estoque'
                    }}
                />
                <AppStack.Screen 
                    name="Clientes" 
                    component={Clientes} 
                    options={{
                        headerStyle: {
                            backgroundColor: '#615D6C'
                        },
                        headerTintColor: '#FFF',
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        },
                        headerTitle: 'Clientes'
                    }}
                />
                <AppStack.Screen 
                    name="VisualizaEstoque" 
                    component={VisualizaEstoque} 
                    options={{
                        headerStyle: {
                            backgroundColor: '#615D6C'
                        },
                        headerTintColor: '#FFF',
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        },
                        headerTitle: 'Visualiza Estoque'
                    }}
                />
                <AppStack.Screen 
                    name="VisualizaCliente" 
                    component={VisualizaCliente} 
                    options={{
                        headerStyle: {
                            backgroundColor: '#615D6C'
                        },
                        headerTintColor: '#FFF',
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        },
                        headerTitle: 'Visualiza Cliente'
                    }}
                />
                <AppStack.Screen 
                    name="VisualizaProduto" 
                    component={VisualizaProduto} 
                    options={{
                        headerStyle: {
                            backgroundColor: '#615D6C'
                        },
                        headerTintColor: '#FFF',
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        },
                        headerTitle: 'Visualiza Produto'
                    }}
                />
            </AppStack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;