const signale = require('signale');
const puppeteer = require('puppeteer');
const qoa = require('qoa');

const isValidURL = (str) => (
	str.match(/(http(s)?:\/\/.)?(www\\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) !== null
);

const prompt = async () => {
	let input = await qoa.input({
		query: 'Please enter the target URL:',
		handle: 'url'
	});
	if (isValidURL(input.url)) {
		return input;
	}
	return await prompt();
}

console.log(`
     _       __     __   _____                                
    | |     / /__  / /_ / ___/______________ _____  ___  _____
    | | /| / / _ \\/ __ \\\\__ \\/ ___/ ___/ __ \`/ __ \\/ _ \\/ ___/
    | |/ |/ /  __/ /_/ /__/ / /__/ /  / /_/ / /_/ /  __/ /    
    |__/|__/\\___/_.___/____/\\___/_/   \\__,_/ .___/\\___/_/     
                                          /_/                                              
=================================================================================
    Version: 1.0.0    Date: 25/01/2021    Author: Ange Rodriguez
=================================================================================
`)

  
prompt().then(async ({ url }) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	
	signale.pending('Fetching data...');

	await page.goto(url);
	await page
		.screenshot({ path: `screenshots/${Date.now()}.png` })
		.then(() => {
			signale.success('Operation successful');
		});

	await browser.close();
});