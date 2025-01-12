import { Image } from "./image.js"

export async function solution(input) {
	const image = new Image(input)
	image.enhance(2)
	return image.countLitPixels()
}
