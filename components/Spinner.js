import React from 'react'
import { View, Image } from 'react-native'
import loading from '../assets/loading.gif'

const Spinner = () => {

    return (
        <View style={
            { alignItems: 'center' }
        }>
            <Image source={loading} alt="loading" />
        </View>
    )

}

export default Spinner