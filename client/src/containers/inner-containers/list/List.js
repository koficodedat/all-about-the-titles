import React from 'react';
import './List.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List} from 'material-ui/List';

import TitleItem from '../../../components/title-item/TitleItem';

export default class ListContainer extends React.Component {

	constructor(props){
		super(props);
		this.getList = this.getList.bind(this);
	}

	componentDidMount(){}

	getList = () => {
		return this.props.titles.map( 
			(title, index) => (
				<TitleItem
					key={title.id} 
					title={title}
				/>
			)
		)
	}

	render() {

		return (
			<div className='list-container'>
				<MuiThemeProvider>
					<List className='list'>
						{this.getList()}
					</List>
				</MuiThemeProvider>
			</div>
		)
	}
}