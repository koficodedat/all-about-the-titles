
const baseUrl = 'http://localhost:4000/api/title';

export default class TitleService{

	constructor(){}

	searchTitles( criteria ): Array {
		const headers = new Headers({ 'Content-Type': 'application/json' })
		const request = buildRequest(baseUrl + '/', 'POST', headers, { criteria: criteria } )
		return fetch( request );
	}

	getDetail( id ): Object {
		const headers = new Headers({ 'Content-Type': 'application/json' })
		const request = buildRequest(baseUrl + '/detail', 'POST', headers, { id: id } )
		return fetch( request );
	}

}

function buildRequest( url, method, headers, body ){
	return new Request( url, {
		method: method,
		headers: headers,
		body: method === 'POST' ? JSON.stringify(body) : ''
	});
}