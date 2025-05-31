import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable } from 'react-native';
import type { Tree, TreeNode } from '../helpers/file.tree';
import { usePlatform } from '../providers/Platform';
import { IconWrapper } from './elements/IconWrapper';
import { Text } from './elements/Text';

export default function FileTree(props: {
	tree: Tree;
	toggleDrawer: (open: boolean) => void;
	path?: string;
}) {
	const { tree, toggleDrawer, path = '' } = props;

	return (
		<>
			{Object.keys(tree).map((key) => (
				<TreeItem
					key={key}
					name={key}
					item={tree[key]}
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
	path: string;
	toggleDrawer: (open: boolean) => void;
}) {
	const { name, item, path, toggleDrawer } = props;
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

	return (
		<Pressable
			onPress={() => handlePress(item)}
			style={{
				marginTop: -1,
				paddingLeft: 24,
			}}
		>
			<IconWrapper
				icon={
					Object.keys(item.children).length
						? collapsed
							? 'folder'
							: 'folder-open'
						: 'file'
				}
			>
				<Text accent={!name.replace(path, '')} bold={!name.replace(path, '')}>
					{item.fileName
						? name.replace(path, '')
							? name.replace(path, '')
							: 'index'
						: name}
				</Text>
			</IconWrapper>
			{!collapsed && Object.keys(item.children).length > 0 && (
				<FileTree
					tree={item.children}
					toggleDrawer={toggleDrawer}
					path={props.path ? `${props.path}.${name}` : name}
				/>
			)}
		</Pressable>
	);
}
