export default interface Toast {
    id: number;
    type: "success" | "danger" | "info" | "warning" | "light" | "dark";
    message: string;
    duration: number;
}