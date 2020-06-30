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

    formulario: {
        margin: 10
    },

    textInput: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        padding: 5,
        borderRadius: 10
    },

    formGroup: {
        margin: 10
    },

    btnAcoes: {
        borderRadius: 10,
        height: 40,
        width: 200,
        backgroundColor: '#75B09C',
        justifyContent: 'center',
        alignItems: 'center'
    },

    blockSalvar: {
        justifyContent: 'center',
        alignItems: 'center',
    }

});

export default styles;