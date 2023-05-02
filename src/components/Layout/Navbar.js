import React from 'react'

const Navbar = () => {
    return (
        <div className="container-fluid sidebarCss">
            <div className="row">
                <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                    <div className="sidebar-sticky">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    href="https://github.com/quanghuybest2k2/PetShop"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    Nông hộ
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="https://github.com/quanghuybest2k2/PetShop"
                                    rel="noopener noreferrer"
                                >
                                    Nông sản
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="https://github.com/quanghuybest2k2/PetShop"
                                    rel="noopener noreferrer"
                                >
                                    Bổ sung 1
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="https://github.com/quanghuybest2k2/PetShop"
                                    rel="noopener noreferrer"
                                >
                                    Bổ sung 2
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar