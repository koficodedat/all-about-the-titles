import React from 'react';
import './AllAboutTheTitles.css';

import Header from '../components/header/Header';
import Search from '../components/search/Search';
import ListContainer from './inner-containers/list/List';

import TitleService from '../services/TitleService';

export default class AllAboutTheTitles extends React.Component {

	constructor(props){
		super(props);

		this.titleService = new TitleService();
		this.searchTitles = this.searchTitles.bind(this);

		this.state = {
			titles: [],
			onValueChange: this.onValueChange
		}
	}

	searchTitles = ( criteria ) => {

		this.titleService
			.searchTitles( criteria )
			.then( 
				(rs) => rs.json()
					.then(  
						(data) => { 
							this.setState({ titles: data })
					 }) 
			)
			.catch( (er) => console.error('error: ', er) )
	}

	onValueChange = (event, newValue) => {
		this.searchTitles(newValue);
	}

	render() {

		const { onValueChange } = this.state;
		const { titles } = this.state;

		return (
			<div className='aatt-container'>
				<Header />
				<Search onValueChange={onValueChange} />
				<ListContainer titles={titles} />
			</div>
		)
	}
}