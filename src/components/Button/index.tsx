import { Text, View, TouchableOpacity } from 'react-native'
import { styles } from './style'

type ButtonProps = {
	title: string
	onPress?: () => void
}

export function Button({ title, onPress }: ButtonProps) {
	return (
		<TouchableOpacity
			style={styles.container}
			activeOpacity={0.8}
			onPress={onPress}
		>
			<Text style={styles.title}>{title}</Text>
		</TouchableOpacity>
	)
}
