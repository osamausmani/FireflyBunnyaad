import { PermissionsAndroid, Alert, Platform } from 'react-native'
import { readFile } from 'react-native-fs'


export const recordPermissions = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Permissions for write access',
                    message: 'Give permission to your storage to write a file',
                    buttonPositive: 'ok',
                },
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the storage')
            } else {
                Alert.alert('BUNNYAAD', 'You must allow to proceed further.')
                navigation.pop()
                return
            }
        } catch (err) {
            console.warn(err)
            return
        }
    }
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                    title: 'Permissions for Record audio',
                    message: 'Give permission to your mic and speaker',
                    buttonPositive: 'ok',
                },
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can the mic now')
            } else {
                Alert.alert('BUNNYAAD', 'You must allow to proceed further.')
                navigation.pop()
                return
            }
        } catch (err) {
            console.warn(err)
            return
        }
    }
}

export const getUriToBase64 = async audio => {
    const base64String = await readFile(audio, 'base64')
    const audioObj = {
        uri: `${base64String}`,
    }
    return audioObj
}

export const checkPermission = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Storage permission required',
                    message: 'Give permission to your storage to write a file',
                    buttonPositive: 'ok',
                },
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the storage')
                download()
            } else {
                Alert.alert('BUNNYAAD', 'You must allow to proceed further.')
            }
        } catch (err) {
            console.warn(err)
            return
        }
    }
    else {
    }

}

export const getUrlExtension = (url) => {
    return url.split(/[#?]/)[0].split(".").pop().trim();
}
export const options = {
    sampleRate: 16000, // default 44100
    channels: 1, // 1 or 2, default 1
    bitsPerSample: 16, // 8 or 16, default 16
    audioSource: 6, // android only (see below)
    wavFile: 'audio.wav', // default 'audio.wav'
}