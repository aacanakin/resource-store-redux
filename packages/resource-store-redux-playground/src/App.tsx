import React from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const App: React.FC = () => {
	return (
		<div className="App">
			<Box component="span" m={1}>
				<Button />
			</Box>
			<Button>Hello</Button>
		</div>
	);
};

export default App;
