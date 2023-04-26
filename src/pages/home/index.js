
import {  useState, useEffect } from 'react'
import {View,
        Text,
        StyleSheet,
        SafeAreaView,
        TextInput, 
        TouchableOpacity,
        FlatList
    } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Logo  } from '../../components/logo'
import api from '../../services/api'
import {FoodList} from '../../components/foodlist'

import { useNavigation } from '@react-navigation/native'

export function Home(){
    const [ inputValue, setInputValue ] = useState("")
    const [foods, setFoods] = useState([])

    const navigation = useNavigation();

    useEffect(() =>{
       async function fetchApi(){
            const response = await api.get("/foods")
            setFoods(response.data)


        }
        fetchApi();
    }, [])

    function handleSearch(){
        if (!inputValue) return;
        
        let input = inputValue;
        setInputValue("")
        navigation.navigate("Search", {name: input})
    }
    return(
        <SafeAreaView style={styles.container}> 
             <Logo />
             <Text style={styles.text}>Encontre a receita</Text>
             <Text style={styles.text}>que combina com você</Text>

             <View style={styles.form}>
                <TextInput 
                 placeholder= "Digite o nome da receita..."
                 style={styles.input}
                 value={inputValue}
                 onChangeText={ (text) => setInputValue (text)}
                />
            <TouchableOpacity  onPress={handleSearch}>
                <Ionicons name="search" size={28} color="#4CBE6C"/>
            </TouchableOpacity>
             </View>


             <FlatList
             data={foods}
             keyExtractor={ (item) => String(item.id)}
             renderItem={ ({ item }) => <FoodList  data={item}/>}
             showsVerticalScrollIndicator={false}
             />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#F3F9FF',
        padding: 36,
        paddingStart:14,
        paddingEnd: 14
    },
    text:{
        fontSize: 26,
        fontWeight: 'bold',
        color: '#0e0e0e'
    },
    form:{
        backgroundColor: '#FFF',
        width: '100%',
        borderRadius:8,
        marginTop: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ECECEC',
        paddingLeft:8,
        paddingRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input:{
        width: '90%',
        height: 54,
        maxWidth: '90%',
        padding: 5,
        fontSize: 15,
        paddingLeft: 15
    },
  
})
