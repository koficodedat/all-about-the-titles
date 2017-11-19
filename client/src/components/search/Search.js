import React from 'react';
import './Search.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

const Search = (props) => (
	<div className='search'>
		<MuiThemeProvider>
			<TextField className='search-box' hintText='Search Titles' onChange={props.onValueChange} />
		</MuiThemeProvider>
	</div>
)

export default Search;