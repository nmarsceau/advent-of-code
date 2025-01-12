import { Image } from "./image.js"

export async function solution(input) {
	const image = new Image(input)
	image.enhance(50)
	return image.countLitPixels()
}
