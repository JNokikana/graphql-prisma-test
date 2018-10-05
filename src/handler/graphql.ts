import Wreck from 'wreck';

async function prismaRequest(query: Object) {
    let options = {
        headers: {
            "Content-Type": "application/json"
        },
        payload: {
            query: query
        }
    }
    let prismaUrl = process.env.PRISMA_URL || "";
    let response = await Wreck.request("POST", prismaUrl, options);
    return response;
}

export async function request(request: any, reply: any) {
    let query = request.payload.graphql;
    let response = await prismaRequest(query);
    return response;
}