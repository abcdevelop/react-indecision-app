import React from 'react';

import Header from './Header';
import Action from './Action';
import Options from './Options';
import AddOption from './AddOption';
import OptionModal from './OptionModal';


class IndecisionApp extends React.Component {
    state = {
        options: [],
        //['Thing One', 'Thing Two', 'Thing three']
        //options: props.options
        selectedOption: undefined
    };

    handleClearSelectedOption = () => {
        this.setState(() => ({selectedOption: undefined}));
    };

    handleDeleteOptions = () => {
        this.setState(() => ({options: []}));
    };

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) =>
            ({
                options: prevState.options.filter(
                    (option) => optionToRemove !== option
                )
            })
        );
    };

    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        //alert(option);
        this.setState(() => ({
            selectedOption: option
        }));
    };

    handleAddOption = (option) => {
        if (!option) {
            return 'Enter valid value to add item';
        }
        if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists'
        }

        this.setState((prevState) => ({
            options: prevState.options.concat(option)
        }));
    };

    componentDidMount() {
        try {
            //console.log('fetching data');
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if (options) {
                this.setState(() => ({options}));
            }
        } catch (e) {
            //do nothing at all
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            //console.log('saving data');
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options', json);
        }
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    render() {
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer';

        return (
            <div>
                <Header
                    subtitle={subtitle}
                />
                <Action
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption
                    handleAddOption={this.handleAddOption}
                />
                <OptionModal
                    selectedOption={this.state.selectedOption}
                    handleClearSelectedOption={this.handleClearSelectedOption}
                />
            </div>
        );
    }
}

// IndecisionApp.defaultProps = {
//     options: []
// };

export default IndecisionApp;