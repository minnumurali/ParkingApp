import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as PaperProvider } from 'react-native-paper'
import Home from './Screens/Home'
import Parking from './Screens/Parking'
//import Payment from './Screens/Payment'



const Stack :any =createNativeStackNavigator()
export default function App(){

  return (
    <>
    <PaperProvider>
      <StatusBar style="auto"/>
      <NavigationContainer>
        <Stack.Navigator
        initialRouteName="Home">
          <Stack.Screen
            name="Home" component={Home}
            options={{
              headerShown: false
            }}/>  
              <Stack.Screen
            name="Go Back" component={Parking}/>
            {/* <Stack.Screen
            name="Payment" component={Payment}/>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */}

        </Stack.Navigator>

      </NavigationContainer>
    </PaperProvider>
    </>
  )
}
    




const styles = StyleSheet.create({})