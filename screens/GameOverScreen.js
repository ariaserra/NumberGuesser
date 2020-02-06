import React from 'react';
import { StyleSheet, View, Text, Button, Image, Dimensions, ScrollView } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText'
import Colors from '../constants/colors';
import MainButton from '../components/MainButton'

const GameOverScreen = props => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>The game is over!!!</TitleText>
                <View style={styles.imageContainer}>
                    <Image
                        fadeDuration={350}
                        //source={{uri:'https://en.wikipedia.org/wiki/Summit#/media/File:Iv%C3%A1n_Ernesto_G%C3%B3mez_Carrasco_en_la_cima_del_Monte_Everest.jpg'}} 
                        source={require('../assets/success.png')}
                        style={styles.image} resizeMode="cover" />
                </View>
                <BodyText style={styles.resultText}>Your phone needed <BodyText style={styles.highlight}>{props.roundsNumber}</BodyText> rounds to guess the number <BodyText style={styles.highlight}>{props.userNumber}</BodyText>.</BodyText>
                <View>
                    <MainButton onPress={props.onRestartGame}>NEW GAME</MainButton>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    button: {
        width: 200
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30
    },
    highlight: {
        color: Colors.primary
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    }
});

export default GameOverScreen;