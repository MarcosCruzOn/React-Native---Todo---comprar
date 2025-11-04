import { View, TouchableOpacity, Text } from 'react-native'
import { Trash } from 'lucide-react-native'

import { styles } from './style'
import { StatusIcon } from '../StatusIcon'
import { FilterStatus } from '@/types/FilterStatus'

type ItemProps = {
	status: FilterStatus
	description: string
}

type Props = {
	data: ItemProps
	onRemove: () => void
	onStatus: () => void
}

export function Item({ data, onStatus, onRemove }: Props) {
	return (
		<View style={styles.container}>
			<TouchableOpacity activeOpacity={0.8} onPress={onStatus}>
				<StatusIcon status={data.status} />
			</TouchableOpacity>

			<Text style={styles.description}>{data.description}</Text>

			<TouchableOpacity onPress={onRemove}>
				<Trash size={18} color="#828282" />
			</TouchableOpacity>
		</View>
	)
}
