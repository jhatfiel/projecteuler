import React, {useState, useEffect} from 'react';
import {render, Text, Box} from 'ink';

const Example = () => (
	<>
		<Text color="green">I am green</Text>
		<Text color="black" backgroundColor="white">
			I am black on white
		</Text>
		<Text color="#ffffff">I am white</Text>
		<Text bold>I am bold</Text>
		<Text italic>I am italic</Text>
		<Text underline>I am underline</Text>
		<Text strikethrough>I am strikethrough</Text>
		<Text inverse>I am inversed</Text>
	</>
);

render(<Example />);

/*
const Counter = () => {
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCounter(previousCounter => previousCounter + 1);
		}, 1);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return <Text color="green">{counter} tests passed</Text>;
};

render(<Counter />);
*/
const Test = () => {
    let [x, setX] = useState(1);
    let [bool, setBool] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setX(2);
            setBool(false);
        }, 2000);
    }, []);

    return (<>
        <Box width={25} flexDirection="column" borderStyle="double">
            <Box justifyContent="center" borderStyle="classic"><Text>Normal</Text></Box>
            <Text>   =   =   =   =   =   </Text>
            <Box justifyContent="center" borderStyle="classic" backgroundColor="green" borderBottom={false}><Text>No bottom</Text></Box>
            <Text>   =   =   =   =   =   </Text>
            <Box justifyContent="center" borderStyle={{topLeft: '+', top: '-', topRight: '+',
                               left: '|', right: '|',
                               bottomLeft: '+', bottom: '-', bottomRight: '+'}} borderBottom={false}><Text>Bottom comes back</Text></Box>
            <Text>   =   =   =   =   =   </Text>
            <Box justifyContent="center" borderStyle={{topLeft: '+', top: '-', topRight: '+',
                               left: '|', right: '|',
                               bottomLeft: '+', bottom: '-', bottomRight: '+'}} borderBottom={bool}><Text>Bottom loses styling</Text></Box>
        </Box>
    </>);
};

render(<Test/>);