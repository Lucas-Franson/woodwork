import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
    },

    main: {
        flex: 1,
        justifyContent: 'center',
    },

    list: {
        paddingHorizontal: 5,
        backgroundColor: '#fff',
    },

    listContainer: {
        alignItems: 'center',
    },

    card: {
        shadowColor: '#00000021',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        marginVertical: 10,
        backgroundColor: 'white',
        flexBasis: '42%',
        marginHorizontal: 10,
    },

    cardHeader: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
      
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
      
    cardImage: {
        height: 87,
        width: 120,
        alignSelf: 'center',
        resizeMode: 'stretch'
    },
      
    title: {
        fontSize: 18,
        flex: 1,
        alignSelf: 'center',
        color: '#696969',
        fontFamily: 'Roboto_500Medium'
    },
    
});

export default styles;