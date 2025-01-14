import { EventEmitter } from 'events';

const screenStateEmitter = new EventEmitter();

screenStateEmitter.on('screenChange', (screenName: string) => {
	console.log(`Changing to screen: ${screenName}`);
});

screenStateEmitter.on('loadingStart', () => {
	console.log('Loading started...');
});

screenStateEmitter.on('loadingEnd', () => {
	console.log('Loading finished.');
});

screenStateEmitter.on('error', (error: string) => {
	console.error(`Error: ${error}`);
});

screenStateEmitter.on('success', (message: string) => {
	console.log(`Success: ${message}`);
});
