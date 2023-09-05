import { Text } from 'react-native'
import React from 'react'
import { Colors } from '../../constants'

const AppText = ({ size, color, bold = false, title, children,justifyContent, alignItems ,fontFamily,backgroundColor,fontWeight, ...props }) => {
    return (
        <Text style={{
            fontSize: size,
            fontFamily: fontFamily,
            backgroundColor: backgroundColor,
            fontWeight: bold ? 'bold' : 'normal',
            color: color ? color : Colors.lightblack,
            fontWeight:fontWeight,
            justifyContent:justifyContent,
            alignItems:alignItems,
            ...props
        }}
        >
            {title}{children}
        </Text>
    )
}

export default AppText

