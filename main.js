navigator.mediaDevices.getUserMedia({ video: true, audio: false })
	.then(stream => {
		addStreamToVid(stream, 'me');
	})
	.catch(err => console.log(err));

let addStreamToVid = (stream, videoID) => {
	let vid = document.querySelector('#'+videoID);
	vid.srcObject = stream;
	vid.onloadedmetadata = () => vid.play();
}

let t = 0;

document.querySelectorAll('canvas').forEach(canvas => {
	let seriously = new Seriously();
	let me = seriously.source('#me');
	let target = seriously.target(canvas);
	let effect = seriously.effect('hue-saturation');

	setInterval(() => {
		t += 0.01
		effect.hue = Math.sin(10*t);
		effect.saturation = Math.sin(0.6*t);
	}, 100);
	
	// connect all our nodes in the right order
	effect.source = me;
	target.source = effect;
	seriously.go();
})
