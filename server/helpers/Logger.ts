export class Logger {

	public static log(message: string) {
		console.log(`[${new Date()}]: ${message}`)
	}
}
