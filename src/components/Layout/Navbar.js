import React from 'react';

const Navbar = () => {
    return (
        <div className="container-fluid sidebarCss">
            <div className="row">
                <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                    <div className="sidebar-sticky">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <button className='btn btn-primary mt-3' onClick={() => alert('hoa hong')}>Hoa hồng</button>
                            </li>
                            <li className="nav-item">
                                <button className='btn btn-primary mt-3' onClick={() => alert('chuoi')}>Chuối</button>
                            </li>
                            <li className="nav-item">
                                <button className='btn btn-primary mt-3' onClick={() => alert('Hoa Hướng Dương')}>Hoa Hướng Dương</button>
                            </li>
                            <li className="nav-item">
                                <button className='btn btn-primary mt-3' onClick={() => alert('Cá tầm')}>Cá Tầm</button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div >
        </div >
    )
}

export default Navbar;
