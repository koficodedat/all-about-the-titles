import React from 'react';
import './TitleItem.css';

import {Card, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';

import Star from 'material-ui/svg-icons/toggle/star';
import Genre from 'material-ui/svg-icons/image/style';
import Story from 'material-ui/svg-icons/maps/local-library';
import Language from 'material-ui/svg-icons/action/language';
import Title from 'material-ui/svg-icons/editor/title';
import Participant from 'material-ui/svg-icons/action/perm-identity';

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
			participants: [],
			other_langauges: [],
			other_titles: [],
			onGetDetail: this.onGetDetail,
			onResetDetail: this.onResetDetail
		}
	}

	getDetail = () => {

		this.titleService
			.getDetail( this.props.title.id )
			.then( 
				(rs) => rs.json()
					.then(  
						(data) => { 
							this.setState({ 
								currentDetail: data,
								expanded: true
							})

							this.getAwards();
							this.getGenres();
							this.getStoryLine();
							this.getParticipants();
							this.getOtherLang();
							this.getOtherTitle();
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
		                  	primaryText={<span className='story-type'> {storyline_type} </span>}
		                >
		                	<p>{storyline_descriptions[index]}</p>
		                </ListItem>
					)
				)


		this.setState({
			story_lines: [story_lines_listed]
		})
	}

	getParticipants = () => {

		const { participants } = this.state.currentDetail;

		if(participants.length === 0) return;

		const participants_listed = participants.map( 
					(participant, index) => (
		                <ListItem
		                  	key={index}
		                  	primaryText={participant}
		                />
					)
				)


		this.setState({
			participants: [participants_listed]
		})
	}

	getOtherLang = () => {

		const { other_langauges } = this.state.currentDetail;

		if(other_langauges.length === 0) return;

		const other_lang_listed = other_langauges.map( 
					(other_lang, index) => (
		                <ListItem
		                  key={index}
		                  primaryText={other_lang}
		                />
					)
				)


		this.setState({
			other_langs: [other_lang_listed]
		})
	}

	getOtherTitle = () => {

		const { other_titles } = this.state.currentDetail;

		if(other_titles.length === 0) return;

		const other_title_listed = other_titles.map( 
					(other_title, index) => (
		                <ListItem
		                  key={index}
		                  primaryText={other_title}
		                />
					)
				)


		this.setState({
			other_titles: [other_title_listed]
		})
	}

	componentDidMount(){
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
			],
			participants: [
				<ListItem
		        	key={0}
                  	primaryText='No Participants'
                />,
			],
			other_langauges: [
				<ListItem
		        	key={0}
                  	primaryText='English'
                />,
			],
			other_titles: [
				<ListItem
		        	key={0}
                  	primaryText='No Other Titles'
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
			    			primaryText={ <b>Awards</b> } 
			    			leftIcon={<Star />}
			    			initiallyOpen={false}
			              	nestedItems={this.state.awards}
			    		/>
			    		<ListItem 
			    			primaryText={ <b>Genres</b> }  
			    			leftIcon={<Genre />}
			    			initiallyOpen={false}
			              	nestedItems={this.state.genres}
			    		/>
			    		<ListItem 
			    			primaryText={ <b>Languages Produced</b> }  
			    			leftIcon={<Language />}
			    			initiallyOpen={false}
			              	nestedItems={this.state.other_langs}
			    		/>
			    		<ListItem 
			    			primaryText={ <b>Other Titles</b> }  
			    			leftIcon={<Title />}
			    			initiallyOpen={false}
			              	nestedItems={this.state.other_titles}
			    		/>
			    		<ListItem 
			    			primaryText={ <b>Story Lines</b> } 
			    			leftIcon={<Story />}
			    			initiallyOpen={false}
			              	nestedItems={this.state.story_lines}
			    		/>
			    		<ListItem 
			    			primaryText={ <b>Participants</b> }  
			    			leftIcon={<Participant />}
			    			initiallyOpen={false}
			              	nestedItems={this.state.participants}
			    		/>
			    	</List>
			    </CardText>
	 		</Card>
		)
	}
}