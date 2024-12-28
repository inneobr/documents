import { Text as DefaultText, View as DefaultView } from 'react-native';
import { useTheme } from '@/customs';

export type TextProps =  DefaultText['props'];
export type ViewProps =  DefaultView['props'];

export function Text(props: TextProps) {
    const color = useTheme().font;  
    const { style, ...otherProps } = props;
    return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
    const backgroundColor = useTheme().base
    const { style, ...otherProps }  = props;
  
    return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
