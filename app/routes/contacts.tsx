import { LinksFunction } from '@remix-run/node';
import contactsStyleHref from './conntacts.css?url';

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: contactsStyleHref },
  ];


export default function Contacts () {
    return <div className="contacts-container">
    <h1 className="screen-title">contacts</h1>
</div>
}