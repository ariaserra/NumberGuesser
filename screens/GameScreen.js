import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Button, View, Text, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    }
    return rndNum;
};

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));
    const [rounds, setRounds] = useState(0);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(rounds);
        }
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie!', 'You know that this is wrong...',
                [{ text: 'Sorry!!', style: 'cancel' }]);
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        }
        if (direction === 'greater') {
            currentLow.current = currentGuess;
        }
        setCurrentGuess(generateRandomBetween(currentLow.current, currentHigh.current, currentGuess));
        setRounds(curRounds => curRounds + 1);
    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess:</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <View style={styles.button}><Button title="LOWER" onPress={nextGuessHandler.bind(this, "lower")} /></View>
                <View style={styles.button}><Button title="GREATER" onPress={nextGuessHandler.bind(this, "greater")} /></View>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    },
    button:{
        width:100
    }
});

export default GameScreen;