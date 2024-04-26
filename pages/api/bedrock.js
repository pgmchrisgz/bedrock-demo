export default async function handler(req, res) {
	console.log("req", req);
	// const result = await bedrockconnection;
	res.status(200).json({ pokemon: req.query.pokemon });
}
