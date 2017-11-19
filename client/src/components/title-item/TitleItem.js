import React from 'react';
import './TitleItem.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';

import Star from 'material-ui/svg-icons/toggle/star';

import TitleService from '../../services/TitleService';

export default class TitleItem extends React.Component {

	constructor(props){
		super(props);

		this.titleService = new TitleService();

		this.state = {
			currentDetail: {},
			expanded: false,
			awards: [],
			genres: [],
			story_lines: [],
			onGetDetail: this.onGetDetail,
			onResetDetail: this.onResetDetail
		}
	}

	getDetail = () => {

		console.log('here');

		this.titleService
			.getDetail( this.props.title.id )
			.then( 
				(rs) => rs.json()
					.then(  
						(data) => { 
							console.log('data: ', data);
							this.setState({ 
								currentDetail: data,
								expanded: true
							})

							this.getAwards();
							this.getGenres();
							this.getStoryLine();
					 }) 
			)
			.catch( (er) => console.error('error: ', er) )
	}

	onResetDetail = () => {
		this.setState({
			currentDetail: {},
			expanded: false
		})
	}

	onGetDetail = () => {
		this.getDetail();
	}

	getAwards = () => {

		const { awards } = this.state.currentDetail;

		if(awards.length === 0) return;

		const awards_listed = awards.map( 
					(award, index) => (
		                <ListItem
		                  key={index}
		                  primaryText={award}
		                />
					)
				)


		this.setState({
			awards: [awards_listed]
		})
	}

	getGenres = () => {

		const { genre_names } = this.state.currentDetail;

		if(genre_names.length === 0) return;

		const genres_listed = genre_names.map( 
					(genre, index) => (
		                <ListItem
		                  key={index}
		                  primaryText={genre}
		                />
					)
				)


		this.setState({
			genres: [genres_listed]
		})
	}

	getStoryLine = () => {

		const { storyline_types } = this.state.currentDetail;

		if(storyline_types.length === 0) return;

		const { storyline_descriptions } = this.state.currentDetail;

		const story_lines_listed = storyline_types.map( 
					(storyline_type, index) => (
		                <ListItem
		                	className='story-line'
		                  	key={index}
		                  	primaryText={storyline_type}
		                  	secondaryText={
		                  	<p>{storyline_descriptions[index]}</p>
		                  }
		                />
					)
				)


		this.setState({
			story_lines: [story_lines_listed]
		})
	}

	componentDidMount(){
		console.log('setting states');
		this.setState({
			awards: [
				<ListItem
		        	key={0}
                  	primaryText='No Awards'
                />,
			],
			genres: [
				<ListItem
		        	key={0}
                  	primaryText='No Genres'
                />,
			],
			story_lines: [
				<ListItem
		        	key={0}
                  	primaryText='No Story Lines'
                />,
			]
		})
	}

	render() {

		return (
			<Card className='card' expanded={this.state.expanded}>
			 	<CardText className='card-text'>
			 		<div className='item title'>{this.props.title.title_name + ' released in ' + this.props.title.release_year}</div>
			 		<RaisedButton className='item' label={!this.state.expanded ? 'Details':'Colapse'} primary={true} onClick={ !this.state.expanded ? this.state.onGetDetail : this.state.onResetDetail }/>
			    </CardText>
			    <CardText className='detail' expandable={true}>
			    	<List className='detail-list-container'>
			    		<ListItem 
			    			primaryText='Awards' 
			    			leftIcon={<Star />}
			    			initiallyOpen={false}
			              	nestedItems={this.state.awards}
			    		/>
			    		<ListItem 
			    			primaryText='Genres' 
			    			leftIcon={<Star />}
			    			initiallyOpen={false}
			              	nestedItems={this.state.genres}
			    		/>
			    		<ListItem 
			    			primaryText='Story Lines' 
			    			leftIcon={<Star />}
			    			initiallyOpen={false}
			              	nestedItems={this.state.story_lines}
			    		/>
			    	</List>
			    </CardText>
	 		</Card>
		)
	}
}