import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    
    header: {
        paddingTop: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    
    body: {
        paddingHorizontal: 20,
    },
    
    button: {
        height: 32,
        paddingHorizontal: 20,
        borderRadius: 16,
        backgroundColor: '#4BB0EE',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },

    input: {
        margin: 20,
        fontSize: 16,
        color: '#333',
    },
    
    textUpload: {
        color: '#242424',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    
    image: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles;