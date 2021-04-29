import {useEffect} from "react";
import {HomeMainContainer, Logo, UnderLogo, Content, InvestingIconn, List, ListItems, ListLink} from "./styles/Home-styles"


function Home() {
    useEffect(() => {
        document.title = "Financee"
    }, [])
	return (
		<HomeMainContainer>
			<Logo>Financee</Logo>
			<UnderLogo>
				Your ticket to efficient risk and trade management.
			</UnderLogo>
			<Content>
				<InvestingIconn />
				<List>
					<ListItems>
						<ListLink to="/trade-calculator">
							Trade Calculator
						</ListLink>
					</ListItems>
					<ListItems>
						<ListLink to="/tradebills">
							Manage your tradebills
						</ListLink>
					</ListItems>
					<ListItems>
						<ListLink to="/notes">Take notes</ListLink>
					</ListItems>
					<ListItems>
						<ListLink to="/stock-lookup">Browse stocks</ListLink>
					</ListItems>
					<ListItems>
						<ListLink to="/watchlist">Watchlist</ListLink>
					</ListItems>
				</List>
			</Content>
		</HomeMainContainer>
	);
}

export default Home;
