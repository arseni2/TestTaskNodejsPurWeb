export class TokenCreateDto {
	expire: Date;

	refresh_token: string;

	userId: number;
}