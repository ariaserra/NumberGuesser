import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>The game is over!!!</Text>
            <Text>Number of Rounds: {props.roundsNumber}</Text>
            <Text>Number was: {props.userNumber}</Text>
            <View style={styles.button} >
                <Button title="NEW GAME" onPress={props.onRestartGame}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button:{
        width:200
    }
});

export default GameOverScreen;