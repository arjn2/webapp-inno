import React from "react";
import Form from "./form";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function LoginPage() {
    const session = await getServerSession();
    if (session) {
        redirect("/");
    }
    return <Form />;
}
