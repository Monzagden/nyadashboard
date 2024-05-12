//För att skapa en komponent som visar användarinformationen när användaren är inloggad.

"use client"

import React from "react";
import { useSession } from "next-auth/react";

const User = () => {
    const { data: session } = useSession();

    return <pre>{JSON.stringify(session)}</pre>;
};

export default User;
