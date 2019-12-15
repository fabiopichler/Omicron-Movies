import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { TouchableOpacity } from 'react-native';

import { IIconButtonProps } from './IIconButtonProps';

const IconButton: React.FC<IIconButtonProps> = ({
    name,
    size = 24,
    color = 'white',
    iconComponent: Icon = MaterialIcons,
    iconStyle,
    iconProps,
    children,
    ...rest
}) => (
    <TouchableOpacity
        activeOpacity={0.7}
        {...rest}
    >
        <Icon
            name={name}
            color={color}
            size={size}
            style={iconStyle}
            {...iconProps}
        />
    </TouchableOpacity>
);

export default IconButton;
