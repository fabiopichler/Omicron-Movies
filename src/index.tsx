import './declare-modules.d.ts';

import 'react-native-gesture-handler';
import 'moment-timezone';
import 'moment/locale/pt-br';

import React from 'react';
import moment from 'moment';
import Moment from 'react-moment';

import { AppRegistry } from 'react-native';
import { enableScreens } from 'react-native-screens';

import App from './app/App';

moment.locale('pt-BR');
Moment.globalMoment = moment;
Moment.globalLocale = 'pt-br';
Moment.globalLocal = true;

enableScreens();

const Index = () => (
    <App />
);

AppRegistry.registerComponent('OmicronMovies', () => Index);
