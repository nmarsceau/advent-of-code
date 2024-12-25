import { Packet } from "./packet.js"

export async function solution(input) {
	return new Packet(input[0]).solve()
}
