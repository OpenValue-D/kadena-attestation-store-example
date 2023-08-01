import {Image} from "react-bootstrap";

export default function Footer() {
    return (
        <footer className={"bg-body-secondary"}>
            Tested by: <Image id="greps-logo" src={"greps-logo-lg.png"} alt={"GrepS.dev"}/>
            Powered by: <Image id="kadena-logo" src={"https://kadena.io/wp-content/uploads/2021/10/Favicon-V1.png"} alt={"Kadena.io"}/>
        </footer>
    );
}