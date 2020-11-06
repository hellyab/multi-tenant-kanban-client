import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";

export function CopyrightComponent() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://github.com/hellyab">
                Yabsra A
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}
