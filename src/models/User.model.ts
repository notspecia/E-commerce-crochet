export default interface User {
    username: string,
    email: string,
    blocked: boolean,
    confirmed: boolean,
    provider: string,
    createdAt: string,
}