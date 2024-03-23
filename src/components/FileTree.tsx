import React from 'react';
import { Text } from 'react-native';
import type { FileTreeNode } from '../providers/FileStorage/FileStorageProvider';

export default function FileTree(props: {
	tree: FileTreeNode[];
	index?: number;
}) {
	const { index, tree } = props;
	return (
		<>
			{tree.map((node) => (
				<>
					<Text
						key={node.displayName}
						style={{
							color: node.path ? '#B8C2B9' : '#353835',
							fontFamily: 'sp',
							fontSize: 15,
							marginTop: -1,
							marginLeft: index ? index * 10 : 0,
						}}
					>
						{index && '┕ '}
						{node.displayName}
						{node.path && '.md'}
					</Text>
					{node.children.length > 0 && (
						<FileTree tree={node.children} index={index ? index + 1 : 1} />
					)}
				</>
			))}
		</>
	);
}
