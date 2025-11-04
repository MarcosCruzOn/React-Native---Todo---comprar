import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#d0d2d8',
		alignItems: 'center',

		paddingTop: 70,
	},
	logoImg: {
		width: 200,
		height: 100,
		resizeMode: 'contain',
	},
	form: {
		paddingHorizontal: 24,
		width: '100%',
		gap: 7,
		marginTop: 42,
	},

	content: {
		flex: 1,
		width: '100%',
		backgroundColor: '#fff',
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		padding: 24,
		paddingTop: 32,
		marginTop: 24,
	},
	header: {
		flexDirection: 'row',
		gap: 12,
		width: '100%',
		borderBottomWidth: 1,
		borderBottomColor: '#e4e6ec',
		paddingBottom: 12,
	},
	clearText: {
		fontSize: 12,
		fontWeight: '600',
		color: '#828282',
	},
	clearButton: {
		marginLeft: 'auto',
	},
	separator: {
		width: '100%',
		height: 1,
		backgroundColor: '#eef0f5',
		marginVertical: 15,
	},
	listContent: {
		paddingTop: 24,
		paddingBottom: 62,
	},
	textEmpety: {
		fontSize: 14,
		color: '#808080',
		textAlign: 'center',
	},
})
