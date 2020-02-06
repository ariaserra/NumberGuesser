import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    }
    return rndNum;
};

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
)

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceHeight(Dimensions.get('window').height);
            setAvailableDeviceWidth(Dimensions.get('window').width);
        };
        Dimensions.addEventListener('change', updateLayout);
        return () =>{
            Dimensions.removeEventListener('change', updateLayout);
        };
    })

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
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
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
    }

    if (availableDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <BodyText>Opponent's Guess:</BodyText>
                <View style={styles.controls}>
                    <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
                        <Ionicons name='md-remove' size={24} color='white' />
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
                        <Ionicons name='md-add' size={24} color='white' />
                    </MainButton>
                </View>
                <View style={styles.listContainer}>
                    <FlatList data={pastGuesses}
                        renderItem={renderListItem.bind(this, pastGuesses.length)}
                        keyExtractor={(item) => item}
                        contentContainerStyle={styles.list} />
                </View>
            </View>);
    }

    return (
        <View style={styles.screen}>
            <BodyText>Opponent's Guess:</BodyText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <View>
                    <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
                        <Ionicons name='md-remove' size={24} color='white' />
                    </MainButton>
                </View>
                <View>
                    <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
                        <Ionicons name='md-add' size={24} color='white' />
                    </MainButton>
                </View>
            </Card>
            <View style={styles.listContainer}>
                <FlatList data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    keyExtractor={(item) => item}
                    contentContainerStyle={styles.list} />
            </View>
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
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 400,
        maxWidth: '90%'
    },
    button: {
        width: 100
    },
    listItem: {
        flexDirection: 'row',
        borderColor: 'grey',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        width: '100%'
    },
    listContainer: {
        flex: 1,
        width: Dimensions.get('window').width > 350 ? '60%' : '80%'
    },
    list: {
        flexGrow: 1,
        // alignItems: 'center',
        justifyContent: 'flex-end'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    }
});

export default GameScreen;