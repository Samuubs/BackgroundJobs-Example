import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Creators } from "../actions/userActions";
import { connect } from 'react-redux';

class userList extends Component {
    state = {
        name: ""
    }

    render() {
        let count = 0;
        return (
            <View style={styles.container}>
                <View style={styles.nameContainer}>
                    {this.props.users.map(user => (
                        <Text style={styles.text} key= {count++}>{user}</Text>
                    ))}
                </View>
                <TextInput 
                    placeholder="Digite o seu nome"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    style={styles.textInput}
                    value={this.state.name}
                    onChangeText={text => this.setState({name: text})}
                />
                <TouchableOpacity style={styles.button} onPress={() => this.props.addUser(this.state.name)}>
                    <Text style={styles.buttonText}>Adicionar usuário</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const mapStateToProps = state => ({
    users: state.UserReducer.users
});
const mapDispatchToProps = dispatch => ({
    addUser: (name) => dispatch(Creators.addUser(name))
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }, 
    nameContainer: {
        width: "50%",
        height: "50%",
        backgroundColor: "#aeae",
        alignItems: "center",
        borderRadius: 14,
        marginBottom: 20
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    text: {
        fontSize: 14,
        fontWeight: "bold",
        color: '#fff',
        paddingTop: 14
    },
    button: {
        height: 42,
        backgroundColor: '#aeae',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
    }, 
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        padding: 14
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(userList)