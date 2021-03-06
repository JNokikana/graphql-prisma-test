import * as dotenv from 'dotenv';
dotenv.config({ path: "./app.env" });

import * as Path from 'path';
import * as Hapi from 'hapi';

const Server = new Hapi.Server({
    port: process.env.PORT,
    routes: {
        files: {
            relativeTo: Path.join(__dirname, '../webapp/public')
        }
    }
});

async function initServer() {
    try {
        await Server.register([
            require("inert"),
        ]);
        await Server.register([
            require("./routes/app-routes.js")
        ]);
        if (!process.env.PRISMA_URL) {
            throw "PRISMA_URL is not defined. Shutting down."
        }

        await Server.start();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

initServer();