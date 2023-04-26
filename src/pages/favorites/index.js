import {View, Text, StyleSheet, SafeAreaView , FlatList} from 'react-native'
import {useState, useEffect} from 'react'
import{ getFavorites} from '../../utils/storage'
import { useIsFocused } from '@react-navigation/native';
import {FoodList} from '../../components/foodlist'

export function Favorites(){
const [recipes, setReceipes] = useState([]);
const isFocused = useIsFocused();


useEffect(()=>{
    let isActive = true;
    async function getReceipes(){
        const result = await getFavorites("@appreceitas")
        if(isActive){
            setReceipes(result);
        }

    }
    if(isActive){
        getReceipes();
    }
    return () =>{
        isActive = false;
    }

}, [isFocused])
    return(
        <SafeAreaView style={styles.container}> 
            <Text style={styles.titulo}> Receitas favoritas</Text>

            {recipes.length === 0 && (
                <Text style={styles.alert}>Você ainda não tem uma receita salva.</Text>
            )}

            <FlatList
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 14 }}
            data={recipes}
            keyExtractor={ (item) => String(item.id)}
            renderItem={ ({ item}) => <FoodList data={item}/>}
            
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f3f9ff',
        padding: 14,
        paddingStart: 19,
        paddingTop: 36,
    },
    titulo:{
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 16,
        paddingStart: 13
    },
    alert:{
        padding: 26,
        fontSize: 17,
    }
})