import React from 'react';
import { Pressable, Text } from 'react-native';
import type { FileTreeNode } from '../providers/FileStorage/FileStorageProvider';

export default function FileTree(props: {
	tree: FileTreeNode[];
	index?: number;
}) {
	const { index, tree } = props;
	const [collapsed, setCollapsed] = React.useState(false);

	const handlePress = (node: FileTreeNode) => {
		if (node?.fileName) {
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
						{index && (collapsed ? '▼ ' : '┕ ')}
						{node.displayName}
						{node.fileName && '.md'}
					</Text>
					{!collapsed && node.children.length > 0 && (
						<FileTree tree={node.children} index={index ? index + 1 : 1} />
					)}
				</Pressable>
			))}
		</>
	);
}
