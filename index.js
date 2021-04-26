
// const p1 = async () => {
// 	return new Promise((resolve) => setTimeout(() => resolve(1), 5000))
// }

// const p2 = async () => {
// 	return new Promise((resolve) => setTimeout(() => resolve(2), 5000))
// }

// (async() => {
// 	console.log('start');

// 	const p1r = await p1();
// 	console.log('1 down ', p1r);

// 	const p2r = await p2();
// 	console.log('2 down ', p2r);

// 	console.log('end');
// })()


function onesec(type) {
	return new Promise(function(resolve, reject) {
		// (function(resolve, reject, type){

		for (let i = 0; i < 10000000000; i++) { }

		// setTimeout(() => {
		console.log('One sec got executed ' + type);
		resolve(1);
		// }, 1000);
		// })(resolve, reject, type);
	});
}

function twosec(type) {
	return new Promise(function(resolve, reject) {
		// (function(resolve, reject, type){
		setTimeout(() => {
			console.log('Two sec got executed ' + type);
			resolve(2);
		}, 10000);
		// })(resolve, reject, type);
	});
}

async function SequentialExecute() {
	const obj = {
		two: await twosec('sequential'),
		one: await onesec('sequential')
	}
}

async function ParallelExecute() {
	let p2 = twosec('parallel');
	let p1 = onesec('parallel');

	// const obj1 = {
	// 	one: p1,
	// 	two: p2,
	// }

	// console.log({obj1});

	const obj = {
		one: await p1,
		mid: (() => console.log({ now: this.one }))(),
		two: await p2,
	};

	console.log({ obj });
}

async function MapBehaviour() {	
	await Promise.all(Array.from({ length: 10 }).map(async (e, i) => {
		console.log(`iter: ${i}`);

		const x = await new Promise((resolve) => setTimeout(() => resolve(i), 2000))

		console.log({ x });
	}))
}


async function ForEachBehaviour() {	
	Array.from({ length: 10 }).forEach(async (e, i) => {
		console.log(`iter: ${i}`);

		const x = await new Promise((resolve) => setTimeout(() => resolve(i), 2000))

		console.log({ x });
	})
}

async function ForOfBheaviour() {
	for (const i in Array.from({ length: 10 })) {
		console.log(`iter: ${i}`);

		const x = await new Promise((resolve) => setTimeout(() => {
			resolve(i);
		}, 2000))

		console.log({ x });
	}
}

// SequentialExecute();
// ParallelExecute();
// MapBehaviour();
ForEachBehaviour();
// ForOfBheaviour();