import { useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

function MainLayout({ children, user }) {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<NavBar toggle={toggle} user={user} />
			<SideBar isOpen={isOpen} toggle={toggle} user={user} />
			{children}
		</>
	);
}

export default MainLayout;
