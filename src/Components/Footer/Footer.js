import { Row, Col } from 'react-bootstrap'

function Footer() {
    const footerNav = [
        {
            title: 'Introduction',
            subMenu: [
                {
                    linkText: 'Link 1',
                    href: "/link1"
                },
                {
                    linkText: 'Link 2',
                    href: "/link1"
                }
            ]
        },
        {
            title: 'Reference',
            subMenu: [
                {
                    linkText: 'Link 3',
                    href: "/link1"
                },
                {
                    linkText: 'Link 4',
                    href: "/link1"
                }
            ]
        },
        {
            title: 'Social Media',
            subMenu: [
                {
                    linkText: 'Link 5',
                    href: "/link1"
                },
                {
                    linkText: 'Link 6',
                    href: "/link1"
                }
            ]
        }
    ]
    return (
        <footer>
            <Row className="bg-light">
                {footerNav.map(item => (
                    <Col className="p-5">
                        <p className="text-dark">{item.title}</p>
                        <ul className="list-unstyled">
                            {item.subMenu.map(link => (
                                <li>
                                    <a href={link.href} className="link-dark link-underline-opacity-0">{link.linkText}</a>
                                </li>
                            ))}
                        </ul>
                    </Col>
                ))}
            </Row>
        </footer>
    )

}
export default Footer