import { Text as DefaultText, View as DefaultView } from 'react-native';
import { useTheme } from '@/customs';

export type TextProps =  DefaultText['props'];
export type ViewProps =  DefaultView['props'];

export function Title(props: TextProps) {
    const color = useTheme().font;  
    const { style, ...otherProps } = props;
    return <DefaultText style={[{ color, fontWeight: '600' }, style]} {...otherProps} />;
}

export function Subtitle(props: TextProps) {
    const color = useTheme().tint;  
    const { style, ...otherProps } = props;
    return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

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

export function Card(props: ViewProps) {
    const backgroundColor = useTheme().card
    const { style, ...otherProps }  = props;
  
    return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
