import { StatusBar } from 'expo-status-bar'
import { useState, useEffect } from 'react'

import {
	Text,
	View,
	Image,
	TouchableOpacity,
	FlatList,
	Alert,
} from 'react-native'

import { styles } from './styles'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Filter } from '@/components/Filter'
import { Item } from '@/components/Item'

import { FilterStatus } from '@/types/FilterStatus'
import { ItemStorage, itemsStorage } from '@/storage/itemsStorage'

const FILTER_STATUS: FilterStatus[] = [FilterStatus.DONE, FilterStatus.PENDING]

export default function Home() {
	const [filter, setFilter] = useState(FilterStatus.PENDING)

	const [description, setDescription] = useState('')

	const [items, setItems] = useState<ItemStorage[]>([])

	function update(value: FilterStatus) {
		setFilter(value)
	}

	async function handleAdd() {
		if (!description.trim()) {
			return Alert.alert('Adicionar', 'informe o item de tarefa')
		}
		const newItem = {
			id: Math.random().toString(36).substring(2),
			description,
			status: FilterStatus.PENDING,
		}

		await itemsStorage.add(newItem)
		await itemsByStatus()

		Alert.alert('Adicionar', `adicionado ${description}`)
		setFilter(FilterStatus.PENDING)
		setDescription('')
	}

	async function handleRemove(id: string) {
		try {
			await itemsStorage.remove(id)
			await itemsByStatus()
		} catch (error) {
			console.log(error)
			Alert.alert('Remover', 'não possivel remover este item')
		}
	}

	async function itemsByStatus() {
		try {
			const response = await itemsStorage.getByStatus(filter)
			setItems(response)
		} catch (error) {
			console.log(error)
			Alert.alert('Error', 'não foi possivel filtrar os itens.')
		}
	}

	function handleClear() {
		Alert.alert('limpar', 'deseja remover todos os items?', [
			{
				text: 'Não',
				style: 'cancel',
			},
			{ text: 'Sim', onPress: () => onClear() },
		])
	}

	async function onClear() {
		try {
			await itemsStorage.clear()
			setItems([])
		} catch (error) {
			console.log(error)
			Alert.alert('Error', 'Não conseguimos deletar sua lista')
		}
	}

	async function handleToggleItemStatus(id: string) {
		try {
			await itemsStorage.toggleStatus(id)
			await itemsByStatus()
		} catch (error) {
			console.log(error)
			Alert.alert('Error', 'Não conseguimos atualizar sua lista')
		}
	}

	useEffect(() => {
		itemsByStatus()
	}, [filter])

	return (
		<View style={styles.container}>
			<Image
				style={styles.logoImg}
				source={require('@/app/assets/logo.png')}
			/>
			<View style={styles.form}>
				<Input
					placeholder="Adicione uma nova tarefa"
					onChangeText={setDescription}
					value={description}
				/>
				<Button title="Adicionar" onPress={handleAdd} />
			</View>

			<View style={styles.content}>
				<View style={styles.header}>
					{FILTER_STATUS.map((status) => (
						<Filter
							key={status}
							status={status}
							isActive={status === filter}
							onPress={() => update(status)}
						/>
					))}
					<TouchableOpacity
						style={styles.clearButton}
						onPress={handleClear}
					>
						<Text style={styles.clearText}>Limpar</Text>
					</TouchableOpacity>
				</View>

				<FlatList
					data={items}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<Item
							data={item}
							onRemove={() => handleRemove(item.id)}
							onStatus={() => handleToggleItemStatus(item.id)}
						/>
					)}
					showsVerticalScrollIndicator={false}
					ItemSeparatorComponent={() => (
						<View style={styles.separator} />
					)}
					contentContainerStyle={styles.listContent}
					ListEmptyComponent={() => (
						<Text style={styles.textEmpety}>Nehum item aqui</Text>
					)}
				/>
			</View>

			<StatusBar style="auto" />
		</View>
	)
}
