/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const TODOS = [
    {id:1,name:'First Todo', description:'Get the first data from todo'},
    {id:2,name:'Second Todo', description:'Get the second data from todo'},
    {id:3,name:'Third Todo', description:'Get the third data from todo'}
]

function getTodos(){
    return TODOS
}

function getTodoById(id){
    return TODOS.find(value => value.id ===id)
}

const resolvers = {
    Query: {
        todos : () => {return getTodos()},
        getTodo : (ctx) => {return getTodoById(ctx.arguments.id)}
    }
}

exports.handler = async (event) => {

    const typeName = resolvers[event.typeName]; //searching for Query / Mutation
    if(typeName){
        const resolver = typeName[event.fieldName] //Searching for todos, getTodo
        if(resolver){
            var result = await resolver(event)
            console.log(result);
            return result;
        }
    }
    throw new Error("Resolver not found.")
    
};
