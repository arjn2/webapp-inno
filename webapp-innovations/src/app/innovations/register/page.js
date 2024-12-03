import Form from "./form";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Login() {
    const session = await getServerSession();
    if (session) {
        redirect("/");
    }
    return <Form />;
}
