import {white} from 'chalk';
import render from './render';

const renderNoCommitsMessage = () => {
    render(`Don't have commits :(`, {chalk: white.bold, indent: 2});
};

export default renderNoCommitsMessage;
