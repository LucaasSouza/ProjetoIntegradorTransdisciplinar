import axios from "axios";

export default async function handler(req, res) {
  switch(req.method) {
    case "GET":
      let queryString = ''
      
      if(Object.keys(req.query).length > 0)
        queryString = Object.keys(req.query).map(key => `${key}=${encodeURI(req.query[key])}`).join("&");

      const responseGET = await axios.get(process.env.BACKEND + "usuarios/?" + queryString)
      res.status(200).json(responseGET.data);
    break;

    case "POST":
      const responsePOST = await axios.post(process.env.BACKEND + "usuarios/", req.body)
      res.status(200).json(responsePOST.data);
    break;

    case "PUT":
    break;

    case "DELETE":
    break;

    default:
      res.status(405).json({ message: "Method not allowed" });
    break;
  }
}
