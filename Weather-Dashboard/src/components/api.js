// const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';


export const geoApiOptions = {
	method: 'GET',
	headers: {
		'GeoCodify-key': 'qN8NNAokgIGjQerJoXc1I9XAhfk7xXfF',
		'GeoCodify-host': 'geodb-cities.p.rapidapi.com'
	}
};

export const GEO_API_URL = "https://api.geocodify.com/v2/geocode"

// try {
// 	const response = await fetch('/cities', options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }