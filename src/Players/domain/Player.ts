export class Player {
	readonly name: string;
	constructor(readonly id: string, name: string) {
		if (name.length === 0) {
			this.name = `anonym-${Math.floor(Math.random() * 1000)
				.toString()
				.padStart(4, "0")}`;
		} else {
			this.name = name;
		}
	}
}
