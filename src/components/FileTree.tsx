import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text } from 'react-native';
import type { Tree, TreeNode } from '../helpers/file.tree';

export default function FileTree(props: {
	tree: Tree;
	toggleDrawer: (open: boolean) => void;
	index?: number;
}) {
	const { index, tree, toggleDrawer } = props;

	return (
		<>
			{Object.keys(tree).map((key) => (
				<TreeItem
					key={key}
					name={key}
					item={tree[key]}
					index={index}
					toggleDrawer={toggleDrawer}
				/>
			))}
		</>
	);
}

function TreeItem(props: {
	name: string;
	item: TreeNode;
	index?: number;
	toggleDrawer: (open: boolean) => void;
}) {
	const { name, item, index, toggleDrawer } = props;
	const router = useRouter();
	const [collapsed, setCollapsed] = useState(true);

	const handlePress = (node: TreeNode) => {
		// if (node?.fileName) {
		// 	router.navigate(`/pool/${node.fileName}`);
		// 	toggleDrawer(false);
		// 	return;
		// }
		if (Object.keys(node.children).length > 0) {
			setCollapsed(!collapsed);
		}
	};

	return (
		<Pressable onPress={() => handlePress(item)}>
			<Text
				style={{
					color: item.fileName ? '#B8C2B9' : '#353835',
					fontFamily: 'sp',
					fontSize: 15,
					marginTop: -1,
					marginLeft: index ? index * 20 : 0,
				}}
			>
				{Object.keys(item.children).length
					? collapsed
						? '\udb80\ude4b '
						: '\udb81\udf70 '
					: '\uf15b '}
				{name}
				{item.fileName && '.md'}
			</Text>
			{!collapsed && Object.keys(item.children).length > 0 && (
				<FileTree
					tree={item.children}
					index={index ? index + 1 : 1}
					toggleDrawer={toggleDrawer}
				/>
			)}
		</Pressable>
	);
}
