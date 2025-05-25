import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text } from 'react-native';
import type { Tree, TreeNode } from '../helpers/file.tree';
import { PlatformEnum, usePlatform } from '../providers/Platform';

export default function FileTree(props: {
	tree: Tree;
	toggleDrawer: (open: boolean) => void;
	path?: string;
	index?: number;
}) {
	const { index, tree, toggleDrawer, path = '' } = props;

	return (
		<>
			{Object.keys(tree).map((key) => (
				<TreeItem
					key={key}
					name={key}
					item={tree[key]}
					index={index}
					path={path}
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
	path: string;
	toggleDrawer: (open: boolean) => void;
}) {
	const { name, item, index, path, toggleDrawer } = props;
	const router = useRouter();
	const { platform } = usePlatform();
	const [collapsed, setCollapsed] = useState(true);

	const handlePress = (node: TreeNode) => {
		if (node?.fileName) {
			router.navigate(`/pool/${node.fileName}`);
			toggleDrawer(false);
			return;
		}
		if (Object.keys(node.children).length > 0) {
			setCollapsed(!collapsed);
		}
	};

	const size =
		platform === PlatformEnum.ANDROID || platform === PlatformEnum.IOS
			? 20
			: 15;

	return (
		<Pressable onPress={() => handlePress(item)}>
			<Text
				style={{
					color: '#B8C2B9',
					fontFamily: 'sp',
					fontSize: size,
					marginTop: -1,
					marginLeft: index ? index * 20 : 0,
				}}
			>
				{Object.keys(item.children).length
					? collapsed
						? '\udb80\ude4b '
						: '\udb81\udf70 '
					: '\uf15b '}
				{item.fileName
					? name.replace(path, '')
						? name.replace(path, '')
						: 'index'
					: name}
			</Text>
			{!collapsed && Object.keys(item.children).length > 0 && (
				<FileTree
					tree={item.children}
					index={index ? index + 1 : 1}
					toggleDrawer={toggleDrawer}
					path={props.path ? `${props.path}.${name}` : name}
				/>
			)}
		</Pressable>
	);
}
