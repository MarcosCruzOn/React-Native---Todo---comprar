import { FilterStatus } from '@/types/FilterStatus'
import { CircleCheck, CircleDashed } from 'lucide-react-native'

export function StatusIcon({ status }: { status: FilterStatus }) {
	if (status === FilterStatus.DONE) {
		return <CircleCheck size={18} color="#2c46b1" />
	} else {
		return <CircleDashed size={18} color="#000" />
	}
}
