import AsyncStorage from '@react-native-async-storage/async-storage'
// store item in AsyncStorage
export const _setData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
        return true
    } catch (error) {
        return error
    }
}

// get item from AsyncStorage
export const _retrieveData = async key => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            return value
        } else console.log(key, 'is null')
    } catch (error) {
        return error
    }
}

// get object from AsyncStorage
export const _retrieveObject = async key => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            const parsed = await JSON.parse(value)
            return parsed
        } else { console.log(key, 'is null') }
    } catch (error) {
        return error
    }
}

export const _clearData = () => AsyncStorage.clear()
export const _removeItem = key => AsyncStorage.removeItem(key)
