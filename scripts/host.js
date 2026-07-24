import { createServer } from 'node:http';
import { constants, access, readFile } from 'node:fs/promises';
import { extname } from 'node:path';

const server = createServer(async(req, res) => {
	if(await req.method === 'GET') {
		const path = await req.url.substring(1);
		try {
			console.log('GET ' + path);
			await access(path, constants.R_OK);
			console.log('...able to access ' + path);
			const contents = await readFile(path, { encoding: 'utf8' });
			console.log('...read file contents');
			const ext = extname(path).substring(1);
			console.log('...extension is ' + ext);
			const mimeTypes = {
				html: 'text/html',
				css:  'text/css',
				js:   'text/javascript',
				json: 'application/json'
			}
			const contentType = mimeTypes[ext];
			console.log('...content type is ' + contentType);
			console.log('Serving ' + path + ' (' + contentType + ')');
			res.writeHead(200, { 
				'Content-Type': contentType + ';charset=utf-8'
			});
			res.write(contents);
			res.end();
		} catch {
			res.writeHead(404);
			res.end();
		}
		return;
	}
	res.writeHead(500);
	res.end();
});

server.listen(3000, () => { 
	console.log('Local development server running on port 3000');
});
