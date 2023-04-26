
import {View, Text, StyleSheet}  from 'react-native'

export function Intructions({ data, index }){
    return(
        <View style={styles.container}>
            <Text style={styles.name}>{index+1}-</Text>
            <Text style={styles.text}>{data.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        padding: 8
    },
    name:{
        fontSize: 20,
        fontWeight: 'bold',
        margin: 5
    },
    text:{
        margin: 5
    }

})