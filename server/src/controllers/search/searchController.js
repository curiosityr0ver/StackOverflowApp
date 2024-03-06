
const fetchSearchedResultsQuery = require("./searchQuery");
const response = require('../../utils/response')

const fetchSearchedResults = async (req, res) => {
    const { type, keyword } = req.body;
try {
    const { error, output, message } = await fetchSearchedResultsQuery(type, keyword);
    if(error){
        throw new CustomError("Error fetching searched results", 401);

    }else if(output == null){
        throw new CustomError("No results found", 401);
    }
    else{
        response(200, 'Searched results retrieved successfully', { SearchedResults: output }, res);
    }
    
} catch (error) {
    next(error)
    
}
};

module.exports = fetchSearchedResults;
