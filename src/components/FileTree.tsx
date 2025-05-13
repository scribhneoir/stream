import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text } from 'react-native';
import type { FileTreeNode } from '../providers/FileStorage/FileStorageProvider';

export default function FileTree(props: {
	tree: FileTreeNode[];
	toggleDrawer: (open: boolean) => void;
	index?: number;
}) {
	const { index, tree, toggleDrawer } = props;
	const router = useRouter();
	const [collapsed, setCollapsed] = useState(false);

	const handlePress = (node: FileTreeNode) => {
		if (node?.fileName) {
			router.navigate(`/pool/${node.fileName}`);
			toggleDrawer(false);
			return;
		}
		if (node.children.length > 0) {
			setCollapsed(!collapsed);
		}
	};

	return (
		<>
			{tree.map((node) => (
				<Pressable key={node.displayName} onPress={() => handlePress(node)}>
					<Text
						//todo: fix the key
						style={{
							color: node.fileName ? '#B8C2B9' : '#353835',
							fontFamily: 'sp',
							fontSize: 15,
							marginTop: -1,
							marginLeft: index ? index * 10 : 0,
						}}
					>
						{node.children.length
							? collapsed
								? '\udb80\ude4b '
								: '\udb81\udf70 '
							: '\uf15b '}
						{node.displayName}
						{node.fileName && '.md'}
					</Text>
					{!collapsed && node.children.length > 0 && (
						<FileTree
							tree={node.children}
							index={index ? index + 1 : 1}
							toggleDrawer={toggleDrawer}
						/>
					)}
				</Pressable>
			))}
		</>
	);
}
